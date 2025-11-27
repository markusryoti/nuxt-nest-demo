// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    // Allow self-closing on void elements to work better with Prettier
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always', // Always allow self-closing void elements like <input />
          normal: 'always', // Allow self-closing on normal elements
          component: 'always', // Allow self-closing on components
        },
        svg: 'always',
        math: 'always',
      },
    ],
    // Disable other rules that might conflict with Prettier
    // "vue/max-attributes-per-line": "off",
    // "vue/singleline-html-element-content-newline": "off",
    // "vue/multiline-html-element-content-newline": "off",
    // "vue/html-indent": "off",
    // "vue/html-closing-bracket-newline": "off",
  },
});
