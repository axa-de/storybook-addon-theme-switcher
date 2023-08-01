import React, { memo, useCallback, useEffect } from "react";
import { useGlobals, useParameter, useStorybookApi } from "@storybook/manager-api";
import { IconButton, Icons, TooltipLinkList, WithTooltip } from "@storybook/components";
import { ADDON_ID, CONFIG, PARAM_KEY } from "./constants";
import { Theme } from "./types";

export const Tool = memo(function MyAddonSelector() {
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();

  const selected = globals[PARAM_KEY] || 'axa';

  const selectTheme = useCallback((name: string) => {
    updateGlobals({
      [PARAM_KEY]: name
    });
  }, [selected]);

  const getThemeProps = (themes: Theme[], callback: () => void) => {
    return themes.map((item: Theme) => {
      return {
        id: item.id,
        title: item.name,
        onClick: () => {
          selectTheme(item.id);
          callback();
        },
        active: item.id === selected
      };
    });
  };



  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: "Toggle Measure [O]",
      defaultShortcut: ["O"],
      actionName: "outline",
      showInMenu: false,
      action: selectTheme
    });
  }, [selectTheme, api]);

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnClick
      tooltip={({ onHide }) => {
        return (
          <TooltipLinkList
            links={getThemeProps(CONFIG.themes, () => {
              onHide();
            })}
          />
        );
      }}
    >
      <IconButton key="background" title="Change the background of the preview" active={false}>
        <Icons icon="branch" />
        <small>{selected}</small>
      </IconButton>

    </WithTooltip>

  );
});
