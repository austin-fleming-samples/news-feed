const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        accent1: {
          DEFAULT: `var(--c-accent-1)`,
          less: `var(--c-accent-1--less)`,
          lesser: `var(--c-accent-1--lesser)`,
        },
        background: {
          DEFAULT: `var(--c-background)`,
          less: `var(--c-background--less)`,
          lesser: `var(--c-background--lesser)`,
        },
        primary: {
          DEFAULT: `var(--c-primary)`,
          less: `var(--c-primary--less)`,
          lesser: `var(--c-primary--lesser)`,
        },
        ui: {
          error: {
            bg: `var(--c-ui-error--bg)`,
            DEFAULT: `var(--c-ui-error)`,
          },
          info: {
            bg: `var(--c-ui-info--bg)`,
            DEFAULT: `var(--c-ui-info)`,
          },
          success: {
            bg: `var(--c-ui-success--bg)`,
            DEFAULT: `var(--c-ui-success)`,
          },
          warn: {
            bg: `var(--c-ui-warn--bg)`,
            DEFAULT: `var(--c-ui-warn)`,
          },
        },
      },
      fontFamily: {
        'sans': ['Manrope', ...defaultTheme.fontFamily.sans]
      },
      maxWidth: {
        container: `var(--l-max-content-width)`,
        'container-narrow': `var(--l-max-content-width--narrow)`,
      },
      minHeight: {
        screenMinusHeader: `var(--l-screen-minus-header)`,
      },
      spacing: {
        sitegap: '32px',
        header: '65px',
        sitepad: 'var(--site-padding)'
      },
      zIndex: {
        headerPrimary: 6000,
        headerSecondary: 5999,
        headerTertiary: 5000,
        overlay: 8000,
        modal: 9000,
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
