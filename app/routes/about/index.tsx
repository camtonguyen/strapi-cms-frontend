import type { Route } from './+types/index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'AI Blog | About' },
    { name: 'description', content: 'Basic Blog App using React & Strapi CMS' },
  ];
}

export default function About() {
  return <div>About page</div>;
}
