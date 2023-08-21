import type { Preview } from "@storybook/react";
import { html } from "lit";
import { useGlobals } from "@storybook/preview-api";
import { PARAM_KEY } from "../src/constants";
import React from "react";


declare global {
  namespace JSX {
    interface IntrinsicElements {
      "axa-theme": any
    }
  }
}

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    }
  },
  decorators: [ (Story: () => any, context: any) => {
    const [globals] = useGlobals();
    const theme = globals[PARAM_KEY];

    return (
      <axa-theme theme={theme}>
      {Story()}
      </axa-theme>
  )
  }],
};

export default preview;
