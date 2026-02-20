import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import { ColorHelper } from "powerbi-visuals-utils-colorutils";

import Slider = formattingSettings.Slider;
import ValidatorType = powerbi.visuals.ValidatorType;
import Card = formattingSettings.SimpleCard;
import Slice = formattingSettings.Slice;
import ToggleSwitch = formattingSettings.ToggleSwitch;
import ColorPicker = formattingSettings.ColorPicker;
import ItemDropdown = formattingSettings.ItemDropdown;

import { shapesOptions } from "../enumOptions";
import { ISetHighContrastMode } from "./interfaces/ISetHighContrastMode";

export class TaskMilestonesCardSettings extends Card implements ISetHighContrastMode {
    public name: string = "taskMilestones";
    public displayNameKey: string = "Task Milestones";

    public show = new ToggleSwitch({
        name: "show",
        displayNameKey: "Visual_Show",
        value: true
    });

    public fill = new ColorPicker({
        name: "fill",
        displayNameKey: "Visual_Color",
        value: { value: "#000000" }
    });

    public size = new Slider({
        name: "size",
        displayName: "Milestone Size",
        value: 12,
        options: {
            minValue: { value: 4, type: ValidatorType.Min },
            maxValue: { value: 20, type: ValidatorType.Max },
        }
    });

    public shapeType = new ItemDropdown({
        name: "shapeType",
        displayNameKey: "Visual_Shape",
        items: shapesOptions,
        value: shapesOptions.find(el => el.value === "Rhombus") || shapesOptions[0]
    });

    public labelFontSize = new Slider({
        name: "labelFontSize",
        displayName: "Label Font Size",
        value: 16,
        options: {
            minValue: { value: 8, type: ValidatorType.Min },
            maxValue: { value: 24, type: ValidatorType.Max },
        }
    });

    public slices: Slice[] = [this.show, this.fill, this.shapeType, this.size, this.labelFontSize];

    public setHighContrastMode(colorHelper: ColorHelper): void {
        const isHighContrast = colorHelper.isHighContrast;
        this.fill.value.value = colorHelper.getHighContrastColor("foreground", this.fill.value.value);
        this.fill.visible = !isHighContrast;
    }
}