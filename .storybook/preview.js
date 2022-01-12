import {addParameters, addDecorator} from "@storybook/react"; // <- or your storybook framework
import {html} from "lit";

addParameters({
    "storybook-theme-switcher": {
        themes           : [
            {name: "axa", id: "axa-theme", default: true},
            {name: "dbv", id: "dbv-theme"},
        ],
        selectedThemeName: null,
        defaultThemeName : "axa",
    },
});

addDecorator((Story, context) => {
    const { globals: { selectedThemeName }} = context
    return (
        <axa-theme theme={selectedThemeName}>
            <Story />
        </axa-theme>
    )
})
