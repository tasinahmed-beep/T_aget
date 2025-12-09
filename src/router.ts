import { setSeo } from './utils/seo';

export type RouteHandler = () => string | Promise<string>;

interface Route {
    path: string;
    handler: RouteHandler;
    title: string;
    description: string;
}

export class Router {
    private routes: Route[] = [];
    private appContainer: HTMLElement;

    constructor(appContainer: HTMLElement) {
        this.appContainer = appContainer;
        window.addEventListener('popstate', () => this.handleRoute());

        // Intercept link clicks
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            // Handle SVG icons inside links
            const anchor = target.closest('a');
            if (anchor && anchor.hasAttribute('href')) {
                const href = anchor.getAttribute('href')!;
                if (href.startsWith('/')) {
                    e.preventDefault();
                    this.navigate(href);
                }
            }
        });
    }

    addRoute(path: string, handler: RouteHandler, title = 'Home', description = 'Free online tools for developers and creatives.') {
        this.routes.push({ path, handler, title, description });
    }

    navigate(path: string) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    private async handleRoute() {
        const path = window.location.pathname;
        const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/');

        if (route) {
            this.appContainer.innerHTML = await route.handler();
            setSeo(route.title, route.description);
            this.updateActiveLink();
            window.scrollTo(0, 0); // Reset scroll on nav
        }
    }

    private updateActiveLink() {
        const links = document.querySelectorAll('nav a');
        links.forEach(link => {
            if (link.getAttribute('href') === window.location.pathname) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    init() {
        this.handleRoute();
    }
}
