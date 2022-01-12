import React, {Fragment, FunctionComponent, memo, useCallback} from 'react'
import {useGlobals, useParameter} from '@storybook/api'
import {IconButton, Icons, TooltipLinkList, WithTooltip} from '@storybook/components'
import memoize from 'memoizerific'
import {ThemeParameter, Theme, ThemeConfig, GlobalState} from '../types'
import {PARAM_KEY as THEME_PARAM_KEY, TOOL_ID} from '../constants'
import {logger} from '@storybook/client-logger'

export const ThemeSelector = () => {
    const [{selectedThemeName}, updateGlobals] = useGlobals()

    const DEFAULT_THEME_CONFIG: ThemeConfig = {
        selectedThemeName: null,
        defaultThemeName: null,
        themes: [],
        disable: false
    }

    const themeConfiguration = useParameter<ThemeConfig>(THEME_PARAM_KEY, DEFAULT_THEME_CONFIG)

    const getThemeProps = (themes: Theme[], callback: () => void) => {
        return themes.map((item: Theme) => {
            return {
                id: item.id,
                title: item.name,
                onClick: () => {
                    selectTheme(item.id)
                    callback()
                },
                active: item.id === selectedThemeName
            }
        })
    }

    const selectTheme = useCallback(
        name =>
            updateGlobals({
                selectedThemeName: name
            }),
        [selectedThemeName]
    )

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnClick
            tooltip={({onHide}) => {
                return (
                    <TooltipLinkList
                        links={getThemeProps(themeConfiguration.themes, () => {
                            onHide()
                        })}
                    />
                )
            }}
        >
            <IconButton key="background" title="Change the background of the preview" active={false}>
                <Icons icon="branch" />
            </IconButton>
        </WithTooltip>
    )
}
