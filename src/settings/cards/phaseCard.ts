import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import Card = formattingSettings.SimpleCard;
import CompositeCard = formattingSettings.CompositeCard;
import Group = formattingSettings.Group;
import Slice = formattingSettings.Slice;
import ToggleSwitch = formattingSettings.ToggleSwitch;
import ColorPicker = formattingSettings.ColorPicker;
import ItemDropdown = formattingSettings.ItemDropdown;
import TextInput = formattingSettings.TextInput;
import { FontSettings } from "./baseFontCard";
import { positionOptions } from "../enumOptions";
import { ISetHighContrastMode } from "./interfaces/ISetHighContrastMode";
import { ColorHelper } from "powerbi-visuals-utils-colorutils";

export const PhasePropertyIdentifier = {
    objectName: "phase",
    propertyName: "phase1Color"
};

export class PhaseGeneralGroup extends FontSettings {
    public showTitle = new ToggleSwitch({
        name: "showTitle",
        displayNameKey: "Visual_Title",
        value: true
    });

    public position = new ItemDropdown({
        name: "position",
        displayNameKey: "Visual_Position",
        items: positionOptions,
        value: positionOptions[3]
    });

    public titleText = new TextInput({
        name: "titleText",
        displayNameKey: "Title",
        placeholder: "",
        value: "Phases"
    });

    public name: string = "phaseGeneralGroup";
    public displayNameKey: string = "Visual_General";
    public slices: Slice[] = [this.showTitle, this.position, this.titleText, this.font];
}

export class PhaseCardSettings extends CompositeCard implements ISetHighContrastMode {
    public show = new ToggleSwitch({
        name: "show",
        displayNameKey: "Visual_Show",
        value: true
    });

    public topLevelSlice = this.show;
    public general = new PhaseGeneralGroup();

    public phase1Color = new ColorPicker({
        name: "phase1Color",
        displayNameKey: "Survey And Engineering",
        value: { value: "#1E90FF" }
    });

    public phase2Color = new ColorPicker({
        name: "phase2Color",
        displayNameKey: "Implementation",
        value: { value: "#8A2BE2" }
    });

    public phase3Color = new ColorPicker({
        name: "phase3Color",
        displayNameKey: "Close-Out",
        value: { value: "#FF8C00" }
    });

    public name: string = "phase";
    public displayNameKey: string = "Visual Phases";
    public groups: Card[] = [
        this.general,
        new Group({
            name: "phaseColorsGroup",
            displayNameKey: "Visual_Colors",
            slices: [
                this.phase1Color,
                this.phase2Color,
                this.phase3Color
            ]
        })
    ];

    public setHighContrastMode(colorHelper: ColorHelper): void {
        const isHighContrast = colorHelper.isHighContrast;

        this.groups.forEach((group) => {
            group.slices.forEach((slice) => {
                if (slice instanceof ColorPicker) {
                    slice.value.value = colorHelper.getHighContrastColor("foreground", slice.value.value);
                    slice.visible = !isHighContrast;
                }
            });
        });
    }
}