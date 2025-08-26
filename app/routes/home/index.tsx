import type { Route } from './+types/index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'AI Blog | Home' },
    { name: 'description', content: 'Basic Blog App using React & Strapi CMS' },
  ];
}

export default function Home() {
  return <div>Home</div>;
}
