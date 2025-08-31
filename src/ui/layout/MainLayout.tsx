import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { JSXElement } from 'solid-js';

export default function MainLayout(props: { children?: JSXElement }) {
  // Switch theme class here: 'theme-redblack' or 'theme-whitered'
  const themeClass = 'theme-redblack';
  return (
    <div class={`${themeClass} flex h-screen w-screen overflow-hidden`}>
      <Sidebar />
      <div class="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main class="flex-1 overflow-auto p-6 space-y-6">{props.children}</main>
      </div>
    </div>
  );
}
