import React, {Fragment} from 'react'
import {addons, types} from '@storybook/addons'

import {ADDON_ID, TOOL_ID} from '../constants'
import {ThemeSelector} from '../containers/ThemeSelector'

// Register the addon
addons.register(ADDON_ID, () => {
    // Register the tool
    addons.add(TOOL_ID, {
        type: types.TOOL,
        title: 'Theme Switcher',
        match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
        render: ThemeSelector
    })
})
