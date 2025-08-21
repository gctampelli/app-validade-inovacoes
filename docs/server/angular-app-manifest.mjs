
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/register-food"
  },
  {
    "renderMode": 2,
    "route": "/storage-list"
  },
  {
    "renderMode": 2,
    "route": "/onboarding"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5110, hash: 'f6273372ecaf77ad50e2ccfd31467d0c2e46f401af681800cb6de087d5dea42a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1004, hash: '28e7f89198bbb78dda2e2ab269dcaadb1b1094deb6850fd7c024569b51bf96e6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 17631, hash: '7790b5e3a8d3ff3f4f2279fefcace8c36332d3dc12f6eb7e97622c7cfd785848', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'storage-list/index.html': {size: 11915, hash: '86a4fbb504df75507d125517799796d79ced66b907bd03371a6247ec4ecea368', text: () => import('./assets-chunks/storage-list_index_html.mjs').then(m => m.default)},
    'register-food/index.html': {size: 23529, hash: '0dba9f60c5e180f2d483238b8f8870b5da2ca98d8870895f74dbb2cbb2cff3a8', text: () => import('./assets-chunks/register-food_index_html.mjs').then(m => m.default)},
    'onboarding/index.html': {size: 17631, hash: '7790b5e3a8d3ff3f4f2279fefcace8c36332d3dc12f6eb7e97622c7cfd785848', text: () => import('./assets-chunks/onboarding_index_html.mjs').then(m => m.default)},
    'styles-D6NBWWYR.css': {size: 230951, hash: '8asH7LIR5uU', text: () => import('./assets-chunks/styles-D6NBWWYR_css.mjs').then(m => m.default)}
  },
};
