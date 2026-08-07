import * as React from 'react';
import React__default, { ReactNode, CSSProperties, InputHTMLAttributes, HTMLAttributes, Component, ErrorInfo, AnchorHTMLAttributes } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as ToastPrimitives from '@radix-ui/react-toast';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ScrollArea as ScrollArea$1 } from '@base-ui/react/scroll-area';
import { Separator as Separator$1 } from '@base-ui/react/separator';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { AllergyIntolerance, Observation, Patient, Encounter, Condition, MedicationRequest, ServiceRequest } from '@medplum/fhirtypes';
import * as lucide_react from 'lucide-react';
import { ImageProps as ImageProps$1 } from 'next/image';
import { LinkProps as LinkProps$1 } from 'next/link';

interface ComboboxOption {
    value: string;
    label: string;
}
declare const comboboxVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    error?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ComboboxProps extends VariantProps<typeof comboboxVariants> {
    options: ComboboxOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    allowCustomValue?: boolean;
}
declare function Combobox({ options, value, onChange, placeholder, searchPlaceholder, emptyText, size, error, disabled, allowCustomValue, }: ComboboxProps): React.JSX.Element;

type BentoVariant = "surface" | "brand" | "cyan" | "orange" | "purple" | "soft-mint" | "soft-lavender" | "soft-peach" | "soft-sky" | "soft-rose" | "soft-surface" | "glass";
type BentoSize = "sm" | "md" | "lg";
type BentoSpan = 1 | 2 | 3 | 4;
interface BentoCardProps {
    children: ReactNode;
    variant?: BentoVariant;
    size?: BentoSize;
    span?: BentoSpan;
    rowSpan?: 1 | 2;
    href?: string;
    external?: boolean;
    onClick?: () => void;
    hover?: boolean;
    className?: string;
    noPadding?: boolean;
    style?: CSSProperties;
}
declare function BentoCard({ children, variant, size, span, rowSpan, href, external, onClick, hover, className, noPadding, style, }: BentoCardProps): React.JSX.Element;

type BentoGridCols = 1 | 2 | 3 | 4 | "auto";
type BentoGridGap = "tight" | "default" | "loose";
interface BentoGridProps {
    children: ReactNode;
    cols?: BentoGridCols;
    gap?: BentoGridGap;
    className?: string;
    style?: CSSProperties;
}
declare function BentoGrid({ children, cols, gap, className, style, }: BentoGridProps): React.JSX.Element;

declare const Table: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;

declare const buttonVariants: (props?: ({
    variant?: "toggle" | "link" | "text" | "split" | "filled" | "icon" | "outline" | "ghost" | "tonal" | "elevated" | "fab" | null | undefined;
    intent?: "brand" | "neutral" | "success" | "warning" | "danger" | "info" | null | undefined;
    size?: "sm" | "md" | "lg" | "icon" | "xs" | "xl" | "icon-sm" | null | undefined;
    shape?: "circle" | "default" | "square" | "pill" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Omit<VariantProps<typeof buttonVariants>, "variant" | "size"> {
    variant?: VariantProps<typeof buttonVariants>["variant"] | "primary" | "secondary";
    size?: VariantProps<typeof buttonVariants>["size"] | "icon-sm";
    asChild?: boolean;
    loading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    icon?: React.ReactNode;
    analyticsId?: string;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare function Field({ label, help, error, children, htmlFor, }: {
    label?: string;
    help?: string;
    error?: string;
    children: ReactNode;
    htmlFor?: string;
}): React.JSX.Element;
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}
declare function Input({ error, className, ...rest }: InputProps): React.JSX.Element;

interface SelectProps extends React__default.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
    error?: boolean;
}
declare const Select: React__default.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React__default.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React__default.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React__default.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React__default.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React__default.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React__default.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    state?: "error" | "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & {
    error?: boolean;
} & React__default.RefAttributes<HTMLButtonElement>>;
declare const SelectContent: React__default.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React__default.RefAttributes<HTMLDivElement>, "ref"> & React__default.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React__default.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React__default.RefAttributes<HTMLDivElement>, "ref"> & React__default.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React__default.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React__default.RefAttributes<HTMLDivElement>, "ref"> & React__default.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React__default.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React__default.RefAttributes<HTMLDivElement>, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

declare const textareaVariants: (props?: ({
    state?: "error" | "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TextareaProps extends React__default.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
    error?: boolean;
}
declare const Textarea: React__default.ForwardRefExoticComponent<TextareaProps & React__default.RefAttributes<HTMLTextAreaElement>>;

declare const switchVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    state?: "error" | "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SwitchProps extends React__default.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, VariantProps<typeof switchVariants> {
    error?: boolean;
}
declare const Switch: React__default.ForwardRefExoticComponent<SwitchProps & React__default.RefAttributes<HTMLButtonElement>>;

declare const checkboxVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    state?: "error" | "default" | "success" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CheckboxProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof checkboxVariants> {
    /** Label text for the checkbox */
    label?: string;
    /** Error message to display */
    error?: string;
    /** Helper text for additional context */
    helper?: string;
    /** Sets indeterminate state (neither checked nor unchecked) */
    indeterminate?: boolean;
    /** Makes the field required */
    required?: boolean;
    /** Clinical significance for healthcare context */
    clinicalSignificance?: "critical" | "warning" | "info" | "normal";
    /** Optional FHIR observation code mapping */
    fhirObservationCode?: string;
    /** Custom class name */
    className?: string;
}
declare const Checkbox: React__default.ForwardRefExoticComponent<CheckboxProps & React__default.RefAttributes<HTMLInputElement>>;

declare const radioVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    state?: "error" | "default" | "success" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface RadioProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof radioVariants> {
    /** Label text for the radio button */
    label?: string;
    /** Clinical significance for healthcare context */
    clinicalSignificance?: "critical" | "warning" | "info" | "normal";
    /** Optional FHIR observation code mapping */
    fhirObservationCode?: string;
}
declare const Radio: React__default.ForwardRefExoticComponent<RadioProps & React__default.RefAttributes<HTMLInputElement>>;
interface RadioGroupProps extends React__default.FieldsetHTMLAttributes<HTMLFieldSetElement> {
    /** Label for the radio group (rendered as a legend) */
    label?: string;
    /** Error message to display */
    error?: string;
    /** Helper text for additional context */
    helper?: string;
    /** Layout orientation of the radio buttons */
    orientation?: "horizontal" | "vertical";
    /** Marks the group as required */
    required?: boolean;
}
declare const RadioGroup: React__default.ForwardRefExoticComponent<RadioGroupProps & React__default.RefAttributes<HTMLFieldSetElement>>;
interface RadioCardProps extends RadioProps {
    description?: string;
}
declare const RadioCard: React__default.ForwardRefExoticComponent<RadioCardProps & React__default.RefAttributes<HTMLInputElement>>;

type Option$1 = {
    label: string;
    value: string;
};
interface MultiSelectProps {
    options: Option$1[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
    error?: boolean;
}
declare function MultiSelect({ options, selected, onChange, placeholder, className, error, }: MultiSelectProps): React.JSX.Element;

type Option = {
    label: string;
    value: string;
};
interface AutocompleteProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    error?: boolean;
}
declare function Autocomplete({ options, value, onChange, placeholder, className, error, }: AutocompleteProps): React.JSX.Element;

interface FileUploadProps extends React__default.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    onFilesChange?: (files: File[]) => void;
    maxFiles?: number;
    maxSizeMB?: number;
}
declare const FileUpload: React__default.ForwardRefExoticComponent<FileUploadProps & React__default.RefAttributes<HTMLInputElement>>;

type Variant$1 = "critical" | "caution" | "success" | "info" | "ai" | "neutral" | "danger" | "warning";
interface BadgeProps {
    variant?: Variant$1;
    icon?: ReactNode;
    onRemove?: () => void;
    className?: string;
    children: ReactNode;
}
/**
 * Signal-color badges are meant to be clinically meaningful — critical,
 * caution, success, info map directly to the fixed sig-* tokens and should
 * never be reassigned to mean something else on a given screen. "ai" and
 * "neutral" are the two decorative-only variants.
 */
declare function Badge({ variant, icon, onRemove, children }: BadgeProps): React.JSX.Element;

type Variant = "default" | "clickable" | "elevated" | "inset";
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: Variant;
    header?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
}
declare function Card({ variant, header, footer, children, className, ...rest }: CardProps): React.JSX.Element;
declare function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>): React.JSX.Element;
declare function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>): React.JSX.Element;
declare function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): React.JSX.Element;

declare const Modal: React.FC<DialogPrimitive.DialogProps>;
declare const ModalTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const ModalPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const ModalClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const ModalOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ModalContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ModalHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const ModalFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const ModalTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const ModalDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const Drawer: React.FC<DialogPrimitive.DialogProps>;
declare const DrawerTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const drawerVariants: (props?: ({
    side?: "top" | "left" | "right" | "bottom" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, VariantProps<typeof drawerVariants> {
}
declare const DrawerContent: React.ForwardRefExoticComponent<DrawerContentProps & React.RefAttributes<HTMLDivElement>>;
declare const DrawerHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const DrawerFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const DrawerTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const ToastProvider: React.FC<ToastPrimitives.ToastProviderProps>;
declare const ToastViewport: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastViewportProps & React.RefAttributes<HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
declare const toastVariants: (props?: ({
    variant?: "default" | "success" | "warning" | "danger" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>, VariantProps<typeof toastVariants> {
}
declare const Toast: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLLIElement>>;
declare const ToastAction: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastClose: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastTitle: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastTitleProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToastDescription: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastDescriptionProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

interface DatePickerProps {
    value?: Date;
    onChange?: (date?: Date) => void;
    placeholder?: string;
    className?: string;
    error?: boolean;
    fromDate?: Date;
}
declare function DatePicker({ value, onChange, placeholder, className, error, fromDate, }: DatePickerProps): React.JSX.Element;

interface DateRange$1 {
    from?: Date;
    to?: Date;
}
interface DateRangePickerProps {
    value?: DateRange$1;
    onChange?: (date?: DateRange$1) => void;
    placeholder?: string;
    className?: string;
    error?: boolean;
}
declare function DateRangePicker({ value, onChange, placeholder, className, error, }: DateRangePickerProps): React.JSX.Element;

interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> {
    value?: string;
    onChange?: (time: string) => void;
    error?: boolean;
}
declare const TimePicker: React.ForwardRefExoticComponent<TimePickerProps & React.RefAttributes<HTMLInputElement>>;

type AvatarSize = "xs" | "sm" | "md" | "lg";
type Status = "online" | "busy" | "away";
interface AvatarProps {
    name?: string;
    src?: string;
    size?: AvatarSize;
    circle?: boolean;
    status?: Status;
}
declare function Avatar({ name, src, size, circle, status }: AvatarProps): React__default.JSX.Element;
declare function AvatarGroup({ children, max }: {
    children: ReactNode;
    max?: number;
}): React__default.JSX.Element;
interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    compact?: boolean;
    variant?: "dark" | "light";
    className?: string;
}
declare function EmptyState({ icon, title, description, action, compact, variant, className }: EmptyStateProps): React__default.JSX.Element;
declare function Skeleton({ className, size, style }: {
    className?: string;
    size?: "sm" | "md" | "lg";
    style?: React__default.CSSProperties;
}): React__default.JSX.Element;
declare function SkeletonCard(): React__default.JSX.Element;
declare function SkeletonTableRows({ rows, cols }: {
    rows?: number;
    cols?: number;
}): React__default.JSX.Element;
/** Circle skeleton (avatar, icon) — matches clone API */
declare function SkeletonCircle({ size }: {
    size?: number;
}): React__default.JSX.Element;
/** Table skeleton — tenant data-table structure */
declare function SkeletonTable({ rows }: {
    rows?: number;
}): React__default.JSX.Element;

declare const alertVariants: (props?: ({
    variant?: "error" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AlertProps extends VariantProps<typeof alertVariants> {
    title?: string;
    children?: ReactNode;
    /** Show a dismiss (×) button */
    dismissible?: boolean;
    /** Override the left icon */
    icon?: ReactNode;
    /** Optional action button/link */
    action?: ReactNode;
    className?: string;
    onDismiss?: () => void;
}
declare function Alert({ variant, title, children, dismissible, icon, action, className, onDismiss, }: AlertProps): React.JSX.Element | null;
declare const AlertInfo: (p: Omit<AlertProps, "variant">) => React.JSX.Element;
declare const AlertSuccess: (p: Omit<AlertProps, "variant">) => React.JSX.Element;
declare const AlertWarning: (p: Omit<AlertProps, "variant">) => React.JSX.Element;
declare const AlertError: (p: Omit<AlertProps, "variant">) => React.JSX.Element;

declare const spinnerVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xs" | "xl" | null | undefined;
    color?: "white" | "primary" | "muted" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
    label?: string;
    className?: string;
}
declare function Spinner({ size, color, label, className }: SpinnerProps): React.JSX.Element;

type ProgressColor = "default" | "success" | "warning" | "danger" | "gradient";
type ProgressSize = "xs" | "sm" | "md" | "lg";
interface ProgressProps {
    /** 0–100 */
    value: number;
    size?: ProgressSize;
    color?: ProgressColor;
    label?: string;
    showValue?: boolean;
    className?: string;
}
declare function Progress({ value, size, color, label, showValue, className, }: ProgressProps): React.JSX.Element;
interface LabelledProgressProps extends ProgressProps {
    label: string;
}
declare function LabelledProgress({ label, showValue, ...rest }: LabelledProgressProps): React.JSX.Element;

type DeltaDir = "up" | "down" | "flat";
interface StatCardProps {
    title: string;
    value: string | number;
    delta?: string | number;
    deltaDir?: DeltaDir;
    deltaLabel?: string;
    icon?: ReactNode;
    iconBg?: string;
    footer?: string;
    /** Optional sparkline / mini chart content */
    sparkline?: ReactNode;
    className?: string;
}
declare function StatCard({ title, value, delta, deltaDir, deltaLabel, icon, iconBg, footer, sparkline, className, }: StatCardProps): React.JSX.Element;

type TimelineVariant = "info" | "success" | "warning" | "error";
interface TimelineEvent$2 {
    id: string;
    date: string;
    title: string;
    description?: string;
    variant?: TimelineVariant;
    badge?: ReactNode;
    icon?: ReactNode;
}
interface TimelineProps {
    events: TimelineEvent$2[];
    className?: string;
}
declare function Timeline({ events, className }: TimelineProps): React.JSX.Element;

interface AccordionItem {
    id: string;
    title: string;
    content: ReactNode;
    disabled?: boolean;
}
interface AccordionProps {
    items: AccordionItem[];
    /** "single" collapses one at a time; "multiple" allows many open */
    type?: "single" | "multiple";
    /** Default open item id(s) */
    defaultOpen?: string | string[];
    className?: string;
}
declare function Accordion({ items, type, defaultOpen, className, }: AccordionProps): React.JSX.Element;

interface SliderProps {
    /** Current value(s). Single number or [min, max] for range. */
    value?: number[];
    defaultValue?: number[];
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
    /** Show the current value label below the slider */
    showValue?: boolean;
    label?: string;
    className?: string;
}
declare function Slider({ value, defaultValue, min, max, step, disabled, onValueChange, onValueCommit, showValue, label, className, }: SliderProps): React.JSX.Element;

type MenuItemType = "item" | "separator" | "label";
interface MenuItem {
    type?: MenuItemType;
    label?: string;
    /** Left-side icon */
    icon?: ReactNode;
    /** Keyboard shortcut displayed on the right */
    shortcut?: string;
    danger?: boolean;
    disabled?: boolean;
    onSelect?: () => void;
}
interface MenuGroup {
    label?: string;
    items: MenuItem[];
}
interface DropdownMenuProps {
    trigger: ReactNode;
    /** Either a flat list of items, or grouped */
    items?: MenuItem[];
    groups?: MenuGroup[];
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
}
declare function DropdownMenu({ trigger, items, groups, align, side, className, }: DropdownMenuProps): React.JSX.Element;
declare const DropdownMenuRoot: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuContent: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>>;

interface CommandItem {
    id: string;
    label: string;
    icon?: ReactNode;
    shortcut?: string;
    group?: string;
    keywords?: string[];
    onSelect: () => void;
}
interface CommandPaletteProps {
    items: CommandItem[];
    placeholder?: string;
    /** Controlled open state */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Override the keyboard shortcut (default: Cmd/Ctrl + K) */
    hotkey?: string;
    className?: string;
}
declare function CommandPalette({ items, placeholder, open: controlledOpen, onOpenChange, className, }: CommandPaletteProps): React.JSX.Element | null;

interface TreeNode {
    id: string;
    label: string;
    icon?: ReactNode;
    children?: TreeNode[];
}
interface TreeViewProps {
    nodes: TreeNode[];
    selectedId?: string;
    onSelect?: (id: string) => void;
    /** Initially expanded node ids */
    defaultExpanded?: string[];
    className?: string;
}
declare function TreeView({ nodes, selectedId, onSelect, defaultExpanded, className, }: TreeViewProps): React.JSX.Element;

type HeadingLevel = 1 | 2 | 3 | 4;
interface HeadingProps {
    level?: HeadingLevel;
    children: ReactNode;
    className?: string;
}
declare function Heading({ level, children, className }: HeadingProps): React.JSX.Element;
type BodySize = "lg" | "md" | "sm" | "xs";
type BodyColor = "default" | "muted" | "subtle";
interface BodyTextProps {
    size?: BodySize;
    color?: BodyColor;
    as?: "p" | "span" | "div";
    children: ReactNode;
    className?: string;
}
declare function BodyText({ size, color, as: Tag, children, className, }: BodyTextProps): React.JSX.Element;
declare function Caption({ children, className }: {
    children: ReactNode;
    className?: string;
}): React.JSX.Element;
declare function Label({ children, htmlFor, className }: {
    children: ReactNode;
    htmlFor?: string;
    className?: string;
}): React.JSX.Element;
declare function Code({ children, className }: {
    children: ReactNode;
    className?: string;
}): React.JSX.Element;
declare function CodeBlock({ children, language, className }: {
    children: string;
    language?: string;
    className?: string;
}): React.JSX.Element;
declare function TypographySpecimen(): React.JSX.Element;

declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface ToggleGroupProps {
    type?: "single" | "multiple";
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: any) => void;
    size?: "default" | "sm" | "lg";
    variant?: "default" | "outline";
    children: React__default.ReactNode;
    className?: string;
}
declare function ToggleGroup({ type, value, onValueChange, size, variant, children, className, }: ToggleGroupProps): React__default.JSX.Element;
interface ToggleGroupItemProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    children: React__default.ReactNode;
}
declare function ToggleGroupItem({ value: itemValue, children, className, ...props }: ToggleGroupItemProps): React__default.JSX.Element;

interface ContainerProps extends React__default.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    centered?: boolean;
    fluid?: boolean;
}
declare const Container: React__default.ForwardRefExoticComponent<ContainerProps & React__default.RefAttributes<HTMLDivElement>>;
interface SectionProps extends Omit<React__default.HTMLAttributes<HTMLElement>, 'title'> {
    title?: React__default.ReactNode;
    description?: React__default.ReactNode;
    headerAction?: React__default.ReactNode;
    spacing?: 'sm' | 'md' | 'lg' | 'none';
}
declare const Section: React__default.ForwardRefExoticComponent<SectionProps & React__default.RefAttributes<HTMLElement>>;

interface TaskItem {
    id: string;
    title: string;
    patientName?: string;
    dueTime?: string;
    urgency?: 'high' | 'medium' | 'low';
}
interface MessageItem {
    id: string;
    senderName: string;
    senderAvatar?: string;
    preview: string;
    time: string;
    unread: boolean;
}
interface NotificationItem$1 {
    id: string;
    title: string;
    description?: string;
    time: string;
    read: boolean;
    category: 'clinical' | 'system' | 'security';
}
interface EnterpriseTopBarProps {
    logo?: React__default.ReactNode;
    tenantName: string;
    rbacColorTheme?: string;
    onSearchTrigger: () => void;
    isDictating?: boolean;
    onDictationToggle?: () => void;
    showBTG?: boolean;
    onBTGClick?: () => void;
    taskCount?: number;
    chatUnreadCount?: number;
    notificationBadge?: boolean;
    notificationCount?: number;
    idleTimeRemaining?: number | null;
    onLockNow?: () => void;
    userDropdownElement?: React__default.ReactNode;
    userSettingsElement?: React__default.ReactNode;
    tasks?: TaskItem[];
    messages?: MessageItem[];
    notifications?: NotificationItem$1[];
}
declare function EnterpriseTopBar({ logo, tenantName, rbacColorTheme, // Brand blue as fallback
onSearchTrigger, isDictating, onDictationToggle, showBTG, onBTGClick, taskCount, chatUnreadCount, notificationBadge, notificationCount, idleTimeRemaining, onLockNow, userDropdownElement, userSettingsElement, tasks, messages, notifications, }: EnterpriseTopBarProps): React__default.JSX.Element;

interface FooterProps {
    appName?: string;
    version?: string;
    links?: Array<{
        label: string;
        href: string;
    }>;
    className?: string;
}
declare function Footer({ appName, version, links, className, }: FooterProps): React__default.JSX.Element;

declare const sheetVariants: (props?: ({
    side?: "top" | "left" | "right" | "bottom" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SheetProps extends VariantProps<typeof sheetVariants> {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    /** Set true for destructive confirmations — disables click-outside-to-close */
    requireExplicitDismiss?: boolean;
}
/**
 * Slide-over panel. Traps focus, closes on Escape, portals to document.body.
 */
declare function Sheet({ open, onClose, side, title, description, footer, children, requireExplicitDismiss, }: SheetProps): React.ReactPortal | null;

declare function ScrollArea({ className, children, ...props }: ScrollArea$1.Root.Props): React.JSX.Element;
declare function ScrollBar({ className, orientation, ...props }: ScrollArea$1.Scrollbar.Props): React.JSX.Element;

declare function Separator({ className, orientation, ...props }: Separator$1.Props): React.JSX.Element;

declare const Tabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsList: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "underline" | "pill" | "segmented" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface CardGridProps extends React__default.HTMLAttributes<HTMLDivElement> {
    columns?: 1 | 2 | 3 | 4 | 'auto';
    gap?: 'sm' | 'md' | 'lg';
}
declare const CardGrid: React__default.ForwardRefExoticComponent<CardGridProps & React__default.RefAttributes<HTMLDivElement>>;

interface BadgeGroupProps extends React__default.HTMLAttributes<HTMLDivElement> {
    max?: number;
    gap?: 'sm' | 'md';
}
declare const BadgeGroup: React__default.ForwardRefExoticComponent<BadgeGroupProps & React__default.RefAttributes<HTMLDivElement>>;
interface ButtonGroupProps extends React__default.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    attached?: boolean;
}
declare const ButtonGroup: React__default.ForwardRefExoticComponent<ButtonGroupProps & React__default.RefAttributes<HTMLDivElement>>;
interface InputGroupProps extends React__default.HTMLAttributes<HTMLDivElement> {
    children: React__default.ReactNode;
}
declare const InputGroup: React__default.ForwardRefExoticComponent<InputGroupProps & React__default.RefAttributes<HTMLDivElement>>;
declare const InputGroupAddon: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & React__default.RefAttributes<HTMLDivElement>>;

interface ListProps extends React__default.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
    as?: 'ul' | 'ol';
    ordered?: boolean;
    spacing?: 'sm' | 'md' | 'lg';
}
declare const List: React__default.ForwardRefExoticComponent<ListProps & React__default.RefAttributes<HTMLUListElement | HTMLOListElement>>;
interface ListItemProps extends React__default.LiHTMLAttributes<HTMLLIElement> {
    icon?: React__default.ReactNode;
}
declare const ListItem: React__default.ForwardRefExoticComponent<ListItemProps & React__default.RefAttributes<HTMLLIElement>>;

interface Column<T> {
    key: string;
    header: string;
    accessor?: (row: T) => React__default.ReactNode;
    sortable?: boolean;
    width?: string;
}
interface DataGridProps<T extends {
    id: string | number;
}> {
    data: T[];
    columns: Column<T>[];
    pageSize?: number;
    selectable?: boolean;
    onRowClick?: (row: T) => void;
    onSelectionChange?: (selectedIds: (string | number)[]) => void;
    className?: string;
}
declare function DataGrid<T extends {
    id: string | number;
}>({ data, columns, pageSize, selectable, onRowClick, onSelectionChange, className, }: DataGridProps<T>): React__default.JSX.Element;

interface VirtualColumn<T> {
    key: string;
    header: string;
    width: number;
    accessor?: (row: T) => React__default.ReactNode;
}
interface VirtualizedTableProps<T> {
    data: T[];
    columns: VirtualColumn<T>[];
    rowHeight?: number;
    containerHeight?: number;
    className?: string;
}
declare function VirtualizedTable<T extends {
    id: string | number;
}>({ data, columns, rowHeight, containerHeight, className, }: VirtualizedTableProps<T>): React__default.JSX.Element;

interface CarouselProps {
    children: React__default.ReactNode[];
    autoPlay?: boolean;
    interval?: number;
    className?: string;
}
declare function Carousel({ children, autoPlay, interval, className }: CarouselProps): React__default.JSX.Element | null;

interface MasonryProps {
    columns?: number;
    gap?: number;
    children: React__default.ReactNode[];
    className?: string;
}
declare function Masonry({ columns, gap, children, className }: MasonryProps): React__default.JSX.Element;

interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React__default.ReactNode;
}
interface BreadcrumbProps extends React__default.HTMLAttributes<HTMLElement> {
    items: BreadcrumbItem[];
    /** Maximum items to show. Extras are collapsed into "..." */
    maxItems?: number;
    separator?: React__default.ReactNode;
}
declare function Breadcrumb({ items, maxItems, separator, className, ...props }: BreadcrumbProps): React__default.JSX.Element;
interface NavItemProps extends React__default.HTMLAttributes<HTMLAnchorElement> {
    href?: string;
    icon?: React__default.ReactNode;
    label: string;
    badge?: string | number;
    isActive?: boolean;
    isCollapsed?: boolean;
}
declare function NavItem({ href, icon, label, badge, isActive, isCollapsed, className, ...props }: NavItemProps): React__default.JSX.Element;

declare function Breadcrumbs(): React.JSX.Element | null;

declare function SkipLink(): React.JSX.Element;

interface MegaMenuItem {
    title: string;
    description: string;
    href: string;
    icon?: React__default.ReactNode;
}
interface MegaMenuCategory {
    category: string;
    items: MegaMenuItem[];
}
interface MegaMenuProps {
    label?: string;
    categories: MegaMenuCategory[];
    className?: string;
}
declare function MegaMenu({ label, categories, className }: MegaMenuProps): React__default.JSX.Element;

declare const Pagination: {
    ({ className, ...props }: React.ComponentProps<"nav">): React.JSX.Element;
    displayName: string;
};
declare const PaginationContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
declare const PaginationItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
type PaginationLinkProps = {
    isActive?: boolean;
} & React.ComponentProps<"a">;
declare const PaginationLink: {
    ({ className, isActive, ...props }: PaginationLinkProps): React.JSX.Element;
    displayName: string;
};

interface ShellProps {
    children: React__default.ReactNode;
    user?: {
        name: string;
        role: string;
        avatarUrl?: string;
    };
    navigation?: Array<{
        label: string;
        href: string;
        icon: React__default.ReactNode;
        badge?: string | number;
        isActive?: boolean;
    }>;
}
declare function Shell({ children, user, navigation }: ShellProps): React__default.JSX.Element;
interface SidebarProps {
    brandName?: string;
    items: Array<{
        label: string;
        href: string;
        icon: React__default.ReactNode;
        active?: boolean;
        badge?: string | number;
    }>;
    className?: string;
}
declare function Sidebar({ brandName, items, className }: SidebarProps): React__default.JSX.Element;
interface TopNavProps {
    userName?: string;
    userRole?: string;
    className?: string;
}
declare function TopNav({ userName, userRole, className }: TopNavProps): React__default.JSX.Element;

interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
    className?: string;
}
declare function StepIndicator({ steps, currentStep, className }: StepIndicatorProps): React__default.JSX.Element;

interface ScrollableTabItem {
    id: string;
    label: string;
    content: React__default.ReactNode;
}
interface TabsScrollableProps {
    items: ScrollableTabItem[];
    defaultTabId?: string;
    className?: string;
}
declare function TabsScrollable({ items, defaultTabId, className }: TabsScrollableProps): React__default.JSX.Element;

interface TabItem {
    id: string;
    label: string;
    icon?: React__default.ReactNode;
    content: React__default.ReactNode;
}
interface TabsVerticalProps {
    items: TabItem[];
    defaultTabId?: string;
    className?: string;
}
declare function TabsVertical({ items, defaultTabId, className }: TabsVerticalProps): React__default.JSX.Element;

interface WizardStep {
    title: string;
    component: React__default.ReactNode;
}
interface WizardProps {
    steps: WizardStep[];
    onFinish?: () => void;
    className?: string;
}
declare function Wizard({ steps, onFinish, className }: WizardProps): React__default.JSX.Element;

interface FullscreenProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React__default.ReactNode;
    className?: string;
}
declare function Fullscreen({ isOpen, onClose, title, children, className }: FullscreenProps): React__default.JSX.Element | null;

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
    alt?: string;
    title?: string;
}
declare function Lightbox({ isOpen, onClose, src, alt, title }: LightboxProps): React__default.JSX.Element | null;

interface InAppNotificationProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: "info" | "success" | "warning" | "error";
    className?: string;
}
declare function InAppNotification({ isOpen, onClose, title, message, type, className, }: InAppNotificationProps): React__default.JSX.Element | null;

interface ClickOutsideProps {
    onClickOutside: () => void;
    children: React__default.ReactNode;
    className?: string;
}
declare function ClickOutside({ onClickOutside, children, className }: ClickOutsideProps): React__default.JSX.Element;

declare function useDebounce<T>(value: T, delayMs?: number): T;

interface FocusTrapProps {
    children: React__default.ReactNode;
    active?: boolean;
}
declare function FocusTrap({ children, active }: FocusTrapProps): React__default.JSX.Element;

interface HotkeyProps {
    keyCombo: string;
    onTrigger: () => void;
}
declare function Hotkey({ keyCombo, onTrigger }: HotkeyProps): null;

interface IdleTimerProps {
    timeoutMs?: number;
    onTimeout?: () => void;
}
declare function IdleTimer({ timeoutMs, onTimeout }: IdleTimerProps): React__default.JSX.Element | null;

interface KeyboardShortcutProps {
    keys: string[];
    className?: string;
}
declare function KeyboardShortcut({ keys, className }: KeyboardShortcutProps): React__default.JSX.Element;

interface PortalProps {
    children: React__default.ReactNode;
    containerId?: string;
}
declare function Portal({ children, containerId }: PortalProps): React__default.ReactPortal | null;

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}
interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}
declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState;
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    resetError: () => void;
    render(): string | number | bigint | boolean | React__default.JSX.Element | Iterable<React__default.ReactNode> | Promise<React__default.AwaitedReactNode> | null | undefined;
}

/**
 * Animated number counter — ease-out cubic from 0 → target.
 * Handles string values (returns as-is) and numeric values (animates).
 */
declare function CountUp({ target, duration, prefix, suffix, }: {
    target: string | number;
    duration?: number;
    prefix?: string;
    suffix?: string;
}): React.JSX.Element;

interface SuspenseWrapperProps {
    children: ReactNode;
    fallback?: ReactNode;
}
declare function SuspenseWrapper({ children, fallback, }: SuspenseWrapperProps): React__default.JSX.Element;

declare function useThrottle<T>(value: T, limitMs?: number): T;

type ColorTheme = "default" | "nord" | "dental" | "therapy" | "cardiology" | "pediatrics" | "oncology" | "neurology";
type ColorMode = "light" | "dark" | "system";
interface ThemeContextType {
    colorMode: ColorMode;
    colorTheme: ColorTheme;
    setColorMode: (mode: ColorMode) => void;
    setColorTheme: (theme: ColorTheme) => void;
}
declare function ThemeProvider({ children }: {
    children: React__default.ReactNode;
}): React__default.JSX.Element;
declare function useTheme(): ThemeContextType;

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    className?: string;
}
declare function ColorPicker({ color, onChange, className }: ColorPickerProps): React__default.JSX.Element;
interface ResizeHandleProps extends React__default.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
}
declare function ResizeHandle({ orientation, className, ...props }: ResizeHandleProps): React__default.JSX.Element;
interface QRCodeProps extends React__default.HTMLAttributes<HTMLDivElement> {
    value: string;
    size?: number;
}
declare function QRCode({ value, size, className, ...props }: QRCodeProps): React__default.JSX.Element;
interface MarkdownProps extends React__default.HTMLAttributes<HTMLDivElement> {
    content: string;
}
declare function Markdown({ content, className, ...props }: MarkdownProps): React__default.JSX.Element;
interface ScrollAreaProps extends React__default.HTMLAttributes<HTMLDivElement> {
    maxHeight?: number | string;
}

interface TagProps extends React__default.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
    onRemove?: () => void;
}
declare function Tag({ variant, onRemove, className, children, ...props }: TagProps): React__default.JSX.Element;
interface CopyToClipboardProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}
declare function CopyToClipboard({ text, className, children, ...props }: CopyToClipboardProps): React__default.JSX.Element;
interface KebabMenuProps {
    options: {
        label: string;
        onClick: () => void;
        danger?: boolean;
    }[];
    className?: string;
}
declare function KebabMenu({ options, className }: KebabMenuProps): React__default.JSX.Element;
interface SplitButtonProps {
    label: string;
    onClick: () => void;
    options: {
        label: string;
        onClick: () => void;
    }[];
    className?: string;
}
declare function SplitButton({ label, onClick, options, className }: SplitButtonProps): React__default.JSX.Element;
interface SegmentedControlProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}
declare function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps): React__default.JSX.Element;
interface OTPInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}
declare function OTPInput({ length, value, onChange, className }: OTPInputProps): React__default.JSX.Element;

interface ChartAreaProps {
    data: any[];
    categories: string[];
    index: string;
    colors?: string[];
    valueFormatter?: (value: number) => string;
    height?: number;
    showLegend?: boolean;
    showGridLines?: boolean;
}
declare const ChartArea: React__default.FC<ChartAreaProps>;

interface ChartBarProps {
    data: any[];
    bars: {
        key: string;
        color?: string;
        name?: string;
    }[];
    xAxisKey?: string;
    height?: number;
    className?: string;
}
declare function ChartBar({ data, bars, xAxisKey, height, className, }: ChartBarProps): React.JSX.Element;

interface ChartLineProps {
    data: any[];
    lines: {
        key: string;
        color?: string;
        name?: string;
    }[];
    xAxisKey?: string;
    height?: number;
    className?: string;
}
declare function ChartLine({ data, lines, xAxisKey, height, className, }: ChartLineProps): React.JSX.Element;

interface ChartPieProps {
    data: {
        name: string;
        value: number;
        color?: string;
    }[];
    height?: number;
    innerRadius?: number | string;
    outerRadius?: number | string;
    className?: string;
}
declare function ChartPie({ data, height, innerRadius, outerRadius, className, }: ChartPieProps): React.JSX.Element;

interface ScatterDataPoint {
    x: number;
    y: number;
    label?: string;
}
interface ChartScatterProps {
    data: ScatterDataPoint[];
    xAxisLabel?: string;
    yAxisLabel?: string;
    height?: number;
    className?: string;
}
declare function ChartScatter({ data, xAxisLabel, yAxisLabel, height, className, }: ChartScatterProps): React__default.JSX.Element;

interface RadarMetric {
    subject: string;
    A: number;
    B?: number;
    fullMark?: number;
}
interface ChartRadarProps {
    data: RadarMetric[];
    title?: string;
    seriesALabel?: string;
    seriesBLabel?: string;
    height?: number;
    className?: string;
}
declare function ChartRadar({ data, title, seriesALabel, seriesBLabel, height, className, }: ChartRadarProps): React__default.JSX.Element;

interface ChartGaugeProps {
    value: number;
    title?: string;
    label?: string;
    className?: string;
}
declare function ChartGauge({ value, title, label, className }: ChartGaugeProps): React__default.JSX.Element;

interface HeatmapCell {
    day: string;
    hour: string;
    intensity: number;
}
interface ChartHeatmapProps {
    data: HeatmapCell[];
    title?: string;
    className?: string;
}
declare function ChartHeatmap({ data, title, className }: ChartHeatmapProps): React__default.JSX.Element;

interface ChartSparklineProps {
    data: number[];
    color?: string;
    height?: number;
    width?: number | string;
    className?: string;
}
declare function ChartSparkline({ data, color, height, width, className, }: ChartSparklineProps): React__default.JSX.Element;

interface FunnelStage {
    label: string;
    count: number;
    color?: string;
}
interface ChartFunnelProps {
    stages: FunnelStage[];
    className?: string;
}
declare function ChartFunnel({ stages, className }: ChartFunnelProps): React__default.JSX.Element;

interface SankeyFlow {
    from: string;
    to: string;
    value: number;
}
interface ChartSankeyProps {
    flows: SankeyFlow[];
    title?: string;
    className?: string;
}
declare function ChartSankey({ flows, title, className }: ChartSankeyProps): React__default.JSX.Element;

interface BubblePoint {
    x: number;
    y: number;
    z: number;
    name: string;
}
interface ChartBubbleProps {
    data: BubblePoint[];
    title?: string;
    className?: string;
}
declare function ChartBubble({ data, title, className }: ChartBubbleProps): React__default.JSX.Element;

declare const allergyManagerVariants: (props?: ({
    variant?: "default" | "compact" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AllergyManagerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof allergyManagerVariants> {
    allergies: AllergyIntolerance[];
    onAddAllergy?: () => void;
    onRemoveAllergy?: (id: string) => void;
}
declare const AllergyManager: React.ForwardRefExoticComponent<AllergyManagerProps & React.RefAttributes<HTMLDivElement>>;

interface CDSRecord {
    id: string;
    title: string;
    description: string;
    severity: 'info' | 'warning' | 'critical';
    source?: string;
    actionable?: boolean;
    actionLabel?: string;
}
interface ClinicalDecisionSupportProps extends React__default.HTMLAttributes<HTMLDivElement> {
    recommendations: CDSRecord[];
    onAction?: (id: string) => void;
    onDismiss?: (id: string) => void;
}
declare function ClinicalDecisionSupport({ recommendations, onAction, onDismiss, className, ...props }: ClinicalDecisionSupportProps): React__default.JSX.Element | null;

declare const flowsheetVariants: (props?: ({
    density?: "default" | "compact" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ClinicalFlowsheetProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof flowsheetVariants> {
    observations: Observation[];
    timepoints: Date[];
    codes: {
        code: string;
        display: string;
    }[];
}
declare const ClinicalFlowsheet: React.ForwardRefExoticComponent<ClinicalFlowsheetProps & React.RefAttributes<HTMLDivElement>>;

interface ImpressionItem {
    id: string;
    summary: string;
    assessor: string;
    date: string;
    status: "draft" | "completed" | "in-progress";
    prognosis?: string;
}
interface ClinicalImpressionProps {
    impressions: ImpressionItem[];
    className?: string;
}
declare function ClinicalImpression({ impressions, className }: ClinicalImpressionProps): React__default.JSX.Element;

interface MedicationAdminItem {
    id: string;
    medicationName: string;
    dosage: string;
    route: string;
    status: "completed" | "in-progress" | "not-done" | "on-hold";
    administeredAt: string;
    practitionerName: string;
    notes?: string;
}
interface MedicationAdministrationProps {
    items: MedicationAdminItem[];
    title?: string;
    className?: string;
}
declare function MedicationAdministration({ items, title, className, }: MedicationAdministrationProps): React__default.JSX.Element;

interface ImmunizationItem {
    id: string;
    vaccineName: string;
    targetDisease: string;
    doseNumber: string;
    dateGiven: string;
    expirationDate?: string;
    manufacturer?: string;
    status: "completed" | "overdue" | "scheduled";
}
interface ImmunizationRecordProps {
    records: ImmunizationItem[];
    title?: string;
    className?: string;
}
declare function ImmunizationRecord({ records, title, className, }: ImmunizationRecordProps): React__default.JSX.Element;

interface ProcedureItem {
    id: string;
    procedureName: string;
    code?: string;
    performedDate: string;
    performerName: string;
    status: "completed" | "in-progress" | "stopped";
    outcome?: string;
}
interface ProcedureHistoryProps {
    procedures: ProcedureItem[];
    title?: string;
    className?: string;
}
declare function ProcedureHistory({ procedures, title, className, }: ProcedureHistoryProps): React__default.JSX.Element;

interface LabResult {
    id: string;
    testName: string;
    value: string | number;
    unit: string;
    referenceRange: string;
    status: 'normal' | 'abnormal' | 'critical';
    date: string;
    category?: string;
}
interface LabResultViewerProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, 'results'> {
    results: LabResult[];
    patientName?: string;
}
declare function LabResultViewer({ results, patientName, className, ...props }: LabResultViewerProps): React__default.JSX.Element;
interface CarePlanGoal {
    id: string;
    description: string;
    status: 'in-progress' | 'achieved' | 'not-achieved';
    targetDate?: string;
}
interface CarePlanActivity {
    id: string;
    title: string;
    description?: string;
    status: 'not-started' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    performer?: string;
}
interface CarePlan {
    id: string;
    title: string;
    period: {
        start: string;
        end?: string;
    };
    intent: string;
    goals: CarePlanGoal[];
    activities: CarePlanActivity[];
}
interface CarePlanViewerProps extends React__default.HTMLAttributes<HTMLDivElement> {
    plan: CarePlan;
}
declare function CarePlanViewer({ plan, className, ...props }: CarePlanViewerProps): React__default.JSX.Element;

interface DateRange {
    startDate: string;
    endDate: string;
}
interface DateRangeFilterProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value: DateRange;
    onChange: (range: DateRange) => void;
    presets?: {
        label: string;
        range: () => DateRange;
    }[];
}
declare function DateRangeFilter({ value, onChange, presets, className, ...props }: DateRangeFilterProps): React__default.JSX.Element;

declare const encounterFormVariants: (props?: ({
    layout?: "default" | "sidebar" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface EncounterFormProps extends React.FormHTMLAttributes<HTMLFormElement>, VariantProps<typeof encounterFormVariants> {
    patient?: Patient;
    encounter?: Encounter;
    conditions?: Condition[];
    onSubmitEncounter?: (data: any) => void;
}
declare const EncounterForm: React.ForwardRefExoticComponent<EncounterFormProps & React.RefAttributes<HTMLFormElement>>;

interface FamilyHistoryItem {
    relation: string;
    condition: string;
    onsetAge?: string;
    note?: string;
}
interface FamilyHistoryProps {
    history: FamilyHistoryItem[];
    className?: string;
}
declare function FamilyHistory({ history, className }: FamilyHistoryProps): React__default.JSX.Element;

interface GoalItem {
    id: string;
    title: string;
    targetDate: string;
    progressPct: number;
    status: "achieved" | "in-progress" | "cancelled";
    category: string;
}
interface GoalTrackerProps {
    goals: GoalItem[];
    className?: string;
}
declare function GoalTracker({ goals, className }: GoalTrackerProps): React__default.JSX.Element;

declare const medicationListVariants: (props?: ({
    variant?: "default" | "compact" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface MedicationListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof medicationListVariants> {
    medications: MedicationRequest[];
    onAddMedication?: () => void;
    onRemoveMedication?: (id: string) => void;
}
declare const MedicationList: React.ForwardRefExoticComponent<MedicationListProps & React.RefAttributes<HTMLDivElement>>;

type NotificationType = "info" | "success" | "warning" | "error";
interface NotificationItem {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    createdAt: Date;
    read: boolean;
    link?: string;
}
interface NotificationContextType {
    notifications: NotificationItem[];
    unreadCount: number;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
    addNotification: (notif: NotificationItem) => void;
}
declare const useNotifications: () => NotificationContextType | undefined;
interface NotificationProviderProps {
    children: React.ReactNode;
    initialNotifications?: NotificationItem[];
    wsEndpoint?: string;
}
declare const NotificationProvider: React.FC<NotificationProviderProps>;
interface NotificationPopoverProps {
    notifications?: NotificationItem[];
    unreadCount?: number;
    onMarkAsRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
}
declare const NotificationPopover: ({ notifications: propNotifications, unreadCount: propUnreadCount, onMarkAsRead, onMarkAllAsRead, }?: NotificationPopoverProps) => React.JSX.Element;
declare const NotificationCenter: () => React.JSX.Element;
declare const NotificationSettings: () => React.JSX.Element;

declare const observationTrendVariants: (props?: ({
    variant?: "default" | "card" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ObservationTrendProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof observationTrendVariants> {
    title: string;
    observations: Observation[];
    yAxisDomain?: [number | "auto", number | "auto"];
    referenceRange?: {
        low?: number;
        high?: number;
    };
}
declare const ObservationTrend: React.ForwardRefExoticComponent<ObservationTrendProps & React.RefAttributes<HTMLDivElement>>;

declare const patientBannerVariants: (props?: ({
    status?: "default" | "warning" | "critical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PatientBannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof patientBannerVariants> {
    patient: Patient;
    allergies?: AllergyIntolerance[];
}
declare const PatientBanner: React.ForwardRefExoticComponent<PatientBannerProps & React.RefAttributes<HTMLDivElement>>;

interface EducationMaterial {
    id: string;
    title: string;
    type: 'article' | 'video' | 'pdf';
    description: string;
    url: string;
    dateAssigned: string;
    status: 'assigned' | 'viewed' | 'completed';
}
interface PatientEducationProps extends React__default.HTMLAttributes<HTMLDivElement> {
    materials: EducationMaterial[];
    onAction?: (material: EducationMaterial) => void;
}
declare function PatientEducation({ materials, onAction, className, ...props }: PatientEducationProps): React__default.JSX.Element;

interface PatientSearchResult {
    id: string;
    name: string;
    dob?: string;
    gender?: string;
    mrn?: string;
    avatarUrl?: string;
    resourceType?: 'Patient';
}
interface PatientSearchProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    onSearch: (query: string) => Promise<PatientSearchResult[]>;
    onSelect: (patient: PatientSearchResult) => void;
    placeholder?: string;
    debounceMs?: number;
}
declare function PatientSearch({ onSearch, onSelect, placeholder, debounceMs, className, ...props }: PatientSearchProps): React__default.JSX.Element;

interface PatientSummaryData {
    id: string;
    name: string;
    dob: string;
    gender: string;
    mrn: string;
    phone?: string;
    email?: string;
    address?: string;
    bloodType?: string;
    allergies?: string[];
    primaryProvider?: string;
    avatarUrl?: string;
}
interface PatientSummaryProps extends React__default.HTMLAttributes<HTMLDivElement> {
    patient: PatientSummaryData;
}
declare function PatientSummary({ patient, className, ...props }: PatientSummaryProps): React__default.JSX.Element;

interface TimelineEvent$1 {
    id: string;
    type: 'encounter' | 'lab' | 'medication' | 'immunization' | 'note';
    title: string;
    date: string;
    description?: string;
    performer?: string;
}
interface PatientTimelineProps extends React__default.HTMLAttributes<HTMLDivElement> {
    events: TimelineEvent$1[];
}
declare function PatientTimeline({ events, className, ...props }: PatientTimelineProps): React__default.JSX.Element;

interface QualityMeasureData {
    id: string;
    title: string;
    description: string;
    score: number;
    target: number;
    status: 'met' | 'not-met' | 'pending';
    lastUpdated: string;
}
interface QualityMeasureProps extends React__default.HTMLAttributes<HTMLDivElement> {
    measure: QualityMeasureData;
}
declare function QualityMeasure({ measure, className, ...props }: QualityMeasureProps): React__default.JSX.Element;

interface RiskScore {
    name: string;
    score: string | number;
    level: "low" | "moderate" | "high" | "critical";
    description: string;
}
interface RiskAssessmentProps {
    scores: RiskScore[];
    className?: string;
}
declare function RiskAssessment({ scores, className }: RiskAssessmentProps): React__default.JSX.Element;

interface SelectorOption {
    id: string;
    label: string;
    subLabel?: string;
    avatarUrl?: string;
    resourceType?: string;
}
interface SelectorProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    options: SelectorOption[];
    value?: SelectorOption;
    onChange: (value: SelectorOption) => void;
    placeholder?: string;
    icon?: React__default.ReactNode;
}
declare function BaseSelector({ options, value, onChange, placeholder, icon, className, ...props }: SelectorProps): React__default.JSX.Element;
declare function PatientSelector(props: Omit<SelectorProps, 'icon'>): React__default.JSX.Element;
declare function ProviderSelector(props: Omit<SelectorProps, 'icon'>): React__default.JSX.Element;

interface SocialDeterminant {
    category: "Tobacco" | "Alcohol" | "Housing" | "Exercise" | "Diet";
    status: string;
    detail: string;
}
interface SocialHistoryProps {
    factors: SocialDeterminant[];
    className?: string;
}
declare function SocialHistory({ factors, className }: SocialHistoryProps): React__default.JSX.Element;

interface CareContext {
    id: string;
    patientReference: string;
    careContextReference: string;
    display: string;
}
interface ConsentRequest {
    id: string;
    purpose: string;
    status: "REQUESTED" | "GRANTED" | "DENIED" | "EXPIRED" | "REVOKED";
    patientAbhaId: string;
    createdAt: string;
    expiresAt: string;
    careContexts: CareContext[];
    hiTypes: string[];
}
interface ABDMConsentManagerProps {
    consents: ConsentRequest[];
    onRequestConsent?: (abhaId: string, purpose: string, hiTypes: string[]) => void;
    onRevokeConsent?: (consentId: string) => void;
    className?: string;
}
declare function ABDMConsentManager({ consents, onRequestConsent, onRevokeConsent, className, }: ABDMConsentManagerProps): React__default.JSX.Element;

interface ABHAHealthIDCardProps {
    abhaNumber: string;
    abhaAddress: string;
    name: string;
    gender: "Male" | "Female" | "Other";
    dateOfBirth: string;
    mobile: string;
    state: string;
    district: string;
    isVerified?: boolean;
    className?: string;
}
declare function ABHAHealthIDCard({ abhaNumber, abhaAddress, name, gender, dateOfBirth, mobile, state, district, isVerified, className, }: ABHAHealthIDCardProps): React__default.JSX.Element;

interface ClaimStep {
    id: string;
    title: string;
    timestamp: string;
    status: "completed" | "current" | "pending" | "denied";
    description?: string;
}
interface ClaimStatusTimelineProps {
    claimId: string;
    payerName: string;
    totalClaimAmount: string;
    approvedAmount?: string;
    steps: ClaimStep[];
    className?: string;
}
declare function ClaimStatusTimeline({ claimId, payerName, totalClaimAmount, approvedAmount, steps, className, }: ClaimStatusTimelineProps): React__default.JSX.Element;

interface EligibilityResult {
    policyNumber: string;
    payerName: string;
    subscriberName: string;
    status: "ACTIVE" | "INACTIVE" | "PENDING";
    copayAmount: string;
    deductibleRemaining: string;
    annualMaxLimit: string;
    coverageEndDate: string;
    requiresPreAuth: boolean;
}
interface EligibilityCheckerProps {
    onCheckEligibility?: (memberId: string, payerId: string) => Promise<EligibilityResult>;
    initialData?: EligibilityResult;
    className?: string;
}
declare function EligibilityChecker({ onCheckEligibility, initialData, className, }: EligibilityCheckerProps): React__default.JSX.Element;

interface ClaimDenial {
    id: string;
    claimId: string;
    patientName: string;
    denialCode: string;
    denialReason: string;
    amount: string;
    suggestedAction: string;
    deadlineDate: string;
}
interface DenialAnalyticsCardProps {
    denials: ClaimDenial[];
    onTriggerAppeal?: (denialId: string) => void;
    className?: string;
}
declare function DenialAnalyticsCard({ denials, onTriggerAppeal, className, }: DenialAnalyticsCardProps): React__default.JSX.Element;

interface SbarReport {
    patientName: string;
    roomBed: string;
    mrn: string;
    outgoingNurse: string;
    incomingNurse: string;
    shiftType: "Day Shift" | "Night Shift" | "Evening Shift";
    situation: string;
    background: string;
    assessment: string;
    recommendation: string;
    highRiskAlerts: string[];
}
interface NursingHandoffReportProps {
    report: SbarReport;
    onAcknowledgeHandoff?: () => void;
    className?: string;
}
declare function NursingHandoffReport({ report, onAcknowledgeHandoff, className, }: NursingHandoffReportProps): React__default.JSX.Element;

interface PreChartData {
    patientName: string;
    age: number;
    gender: string;
    chiefComplaint: string;
    lastVitals: {
        bp: string;
        hr: number;
        temp: string;
        spo2: number;
    };
    activeDiagnoses: string[];
    pendingOrders: string[];
    riskScore: "LOW" | "MODERATE" | "HIGH";
}
interface PreChartPanelProps {
    data: PreChartData;
    onOpenFullChart?: () => void;
    className?: string;
}
declare function PreChartPanel({ data, onOpenFullChart, className }: PreChartPanelProps): React__default.JSX.Element;

interface UnsignedChartItem {
    id: string;
    patientName: string;
    encounterDate: string;
    encounterType: string;
    providerName: string;
    daysPending: number;
    isLockWarning?: boolean;
}
interface UnsignedChartsCardProps {
    charts: UnsignedChartItem[];
    onSignChart?: (chartId: string) => void;
    onSignAll?: () => void;
    className?: string;
}
declare function UnsignedChartsCard({ charts, onSignChart, onSignAll, className, }: UnsignedChartsCardProps): React__default.JSX.Element;

interface SmartPhrase {
    shortcut: string;
    title: string;
    category: "General" | "Physical Exam" | "Lab Orders" | "Plan";
    content: string;
}
interface SmartPhrasePanelProps {
    phrases: SmartPhrase[];
    onInsertPhrase?: (phrase: SmartPhrase) => void;
    className?: string;
}
declare function SmartPhrasePanel({ phrases, onInsertPhrase, className }: SmartPhrasePanelProps): React__default.JSX.Element;

interface OrderTemplate {
    id: string;
    name: string;
    type: "Medication" | "Laboratory" | "Imaging" | "Procedure";
    details: string;
    frequency?: string;
}
interface FavoriteOrdersPanelProps {
    orders: OrderTemplate[];
    onAddOrder?: (order: OrderTemplate) => void;
    className?: string;
}
declare function FavoriteOrdersPanel({ orders, onAddOrder, className }: FavoriteOrdersPanelProps): React__default.JSX.Element;

interface SignatureCaptureProps {
    signatoryName: string;
    signatoryRole: string;
    onSaveSignature?: (signatureDataUrl: string) => void;
    className?: string;
}
declare function SignatureCapture({ signatoryName, signatoryRole, onSaveSignature, className, }: SignatureCaptureProps): React__default.JSX.Element;

interface CollectPaymentPanelProps {
    patientName: string;
    encounterId: string;
    dueAmount: string;
    onProcessPayment?: (method: "Card" | "UPI" | "Cash", amount: string) => void;
    className?: string;
}
declare function CollectPaymentPanel({ patientName, encounterId, dueAmount, onProcessPayment, className, }: CollectPaymentPanelProps): React__default.JSX.Element;

interface KioskCheckinAlertProps {
    patientName: string;
    checkinTime: string;
    tokenNumber: string;
    assignedRoom: string;
    providerName: string;
    onCallPatient?: () => void;
    className?: string;
}
declare function KioskCheckinAlert({ patientName, checkinTime, tokenNumber, assignedRoom, providerName, onCallPatient, className, }: KioskCheckinAlertProps): React__default.JSX.Element;

interface GuidelineRule {
    title: string;
    recommendation: string;
    evidenceGrade: "Grade A" | "Grade B" | "Grade C";
    source: string;
}
interface ClinicalGuidelinesProps {
    guidelines: GuidelineRule[];
    className?: string;
}
declare function ClinicalGuidelines({ guidelines, className }: ClinicalGuidelinesProps): React__default.JSX.Element;

interface AdvancedDirectiveProps {
    dnrStatus: boolean;
    dniStatus: boolean;
    proxyName?: string;
    proxyPhone?: string;
    verifiedDate?: string;
    className?: string;
}
declare function AdvancedDirective({ dnrStatus, dniStatus, proxyName, proxyPhone, verifiedDate, className, }: AdvancedDirectiveProps): React__default.JSX.Element;

type TimelineEventType = "visit" | "prescription" | "lab" | "procedure" | "note";
interface TimelineEvent {
    id: string;
    type: TimelineEventType;
    date: string;
    title: string;
    provider: string;
    description?: string;
    status?: "completed" | "pending" | "scheduled";
}
interface PatientTimelineViewProps {
    events: TimelineEvent[];
    className?: string;
}
declare function PatientTimelineView({ events, className }: PatientTimelineViewProps): React__default.JSX.Element;

interface ChartDataPoint {
    date: string;
    value: number;
}
interface ClinicalDataChartProps {
    title: string;
    data: ChartDataPoint[];
    unit: string;
    normalRange?: [number, number];
    className?: string;
}
declare function ClinicalDataChart({ title, data, unit, normalRange, className }: ClinicalDataChartProps): React__default.JSX.Element;

declare const conditionManagerVariants: (props?: ({
    variant?: "default" | "compact" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ConditionManagerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof conditionManagerVariants> {
    conditions: Condition[];
    onAddCondition?: () => void;
    onRemoveCondition?: (id: string) => void;
}
declare const ConditionManager: React.ForwardRefExoticComponent<ConditionManagerProps & React.RefAttributes<HTMLDivElement>>;

declare const labResultsListVariants: (props?: ({
    variant?: "default" | "compact" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface LabResultsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof labResultsListVariants> {
    labs: (Observation | ServiceRequest)[];
    onAddLab?: () => void;
    onRemoveLab?: (id: string) => void;
}
declare const LabResultsList: React.ForwardRefExoticComponent<LabResultsListProps & React.RefAttributes<HTMLDivElement>>;

declare const clinicalCopilotVariants: (props?: ({
    variant?: "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ClinicalCopilotProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof clinicalCopilotVariants> {
    onAction?: (actionId: string, label: string) => void;
}
declare const ClinicalCopilot: React.ForwardRefExoticComponent<ClinicalCopilotProps & React.RefAttributes<HTMLDivElement>>;

type ConditionStatus = 'existing' | 'planned' | 'in_progress' | 'completed' | 'watch';
type ToothSurface = 'M' | 'O' | 'D' | 'F' | 'B' | 'L' | 'I';
interface ClinicalFinding {
    id: string;
    type: string;
    surfaces: ToothSurface[];
    severity?: "early" | "moderate" | "severe";
    status: "existing" | "planned" | "watch";
    createdAt: string;
    createdBy: string;
    provider?: string;
    visitId?: string;
}
interface ClinicalTreatment {
    id: string;
    type: string;
    surfaces: ToothSurface[];
    status: "planned" | "in_progress" | "completed" | "existing";
    provider?: string;
    procedureCode?: string;
    material?: string;
    visitId?: string;
    phaseId?: string;
    createdBy?: string;
    acceptanceStatus?: "not_presented" | "presented" | "accepted" | "declined" | "deferred";
    completedAt?: string;
    createdAt: string;
}
interface ToothNote {
    id: string;
    type: string;
    text: string;
    author: string;
    createdAt: string;
    timestamp: string;
}
interface ToothAttachment {
    id: string;
    type: "xray" | "photo" | "cbct" | "scan";
    url: string;
    uploadedAt: string;
}
interface PerioRecord {
    pockets: Record<string, number>;
    recession: Record<string, number>;
    bleeding: Record<string, boolean>;
    mobility: 0 | 1 | 2 | 3;
    furcation: null | 1 | 2 | 3;
}
interface ToothHistoryEvent {
    id: string;
    type: "finding" | "treatment" | "note" | "attachment";
    action: string;
    timestamp: string;
    user: string;
}
interface ToothData {
    id: string;
    selected: boolean;
    findings: ClinicalFinding[];
    treatments: ClinicalTreatment[];
    notes: ToothNote[];
    attachments: ToothAttachment[];
    perio?: PerioRecord;
    history: ToothHistoryEvent[];
}
interface ToothChartState {
    teeth: Record<string, ToothData>;
}
declare const expandSurfaceGroup: (group: string) => ToothSurface[];
declare const CLINICAL_TOOLS: ({
    id: string;
    label: string;
    icon: lucide_react.LucideIcon;
    color: string;
    category: string;
    tooltip: string;
} | {
    id: string;
    label: string;
    icon: lucide_react.LucideIcon;
    color: string;
    category: string;
    tooltip?: undefined;
})[];
interface ToothChartProps {
    value: ToothChartState;
    onChange?: (state: ToothChartState) => void;
    onSave?: (state: ToothChartState) => void;
    readOnly?: boolean;
    className?: string;
}
declare const ToothChart: ({ value, onChange, onSave, readOnly, className, }: ToothChartProps) => React__default.JSX.Element | null;

interface ToothInspectorPanelProps {
    teeth: ToothData[];
    onApplyTool: (toolId: string, surfaces?: ToothSurface[]) => void;
    onRemoveRecord: (toothId: string, recordId: string) => void;
    onToggleSurface?: (toothId: string, recordId: string, surface: ToothSurface) => void;
    onAddNote?: (toothId: string, type: string, text: string) => void;
    className?: string;
}
declare const ToothInspectorPanel: ({ teeth, onApplyTool, onRemoveRecord, onToggleSurface, onAddNote, className }: ToothInspectorPanelProps) => React__default.JSX.Element;

interface TreatmentPlanWorkspaceProps {
    teeth: Record<string, ToothData>;
    onSelectTooth?: (toothId: string) => void;
    onUpdateTreatmentStatus?: (toothId: string, treatmentId: string, status: string) => void;
    onRemoveTreatment?: (toothId: string, treatmentId: string) => void;
}
declare const TreatmentPlanWorkspace: React__default.FC<TreatmentPlanWorkspaceProps>;

/**
 * TENANT THEMING
 * ---------------------------------------------------------------
 * Only the brand accent is tenant-overridable. Signal colors
 * (--sig-critical / caution / success / info) and the pulse accent
 * are intentionally NOT in this type — they are clinical-safety
 * colors and must never vary by tenant. If you find yourself
 * wanting to add them here, stop: that's the one hard boundary
 * this whole system is built around.
 */
interface TenantTheme {
    tenantId: string;
    name: string;
    logoUrl?: string;
    /** Two-stop gradient, e.g. ["#4F3FE0", "#2F6FED"] */
    brandGradient: [string, string];
    brandSolid: string;
    brandTint: string;
}
declare function useTenantTheme(): {
    theme: TenantTheme;
    setTheme: (t: TenantTheme) => void;
};
declare function TenantThemeProvider({ initialTheme, children, }: {
    initialTheme?: TenantTheme;
    children: ReactNode;
}): React.JSX.Element;

declare function ThemeSelector({ className }: {
    className?: string;
}): React__default.JSX.Element;

interface SearchResult {
    id: string;
    type: "patient" | "document" | "medication" | "appointment";
    title: string;
    subtitle?: string;
    url: string;
}
interface GlobalSearchBoxProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    results?: SearchResult[];
    className?: string;
}
declare function GlobalSearchBox({ placeholder, onSearch, results, className }: GlobalSearchBoxProps): React__default.JSX.Element;

/**
 * Thin wrapper around next/image that makes `sizes` a required prop for
 * any non-fill image — the single most common next/image mistake is
 * omitting `sizes`, which silently defeats responsive srcset generation
 * and ships a full-resolution image to mobile.
 *
 * Also standardizes the blur placeholder for clinical photography
 * (patient photos, document scans) so nothing pops in abruptly on a
 * slow ward-tablet connection.
 */
interface ImageProps extends Omit<ImageProps$1, "sizes"> {
    /** Required unless `fill` is false and both width/height are fixed and small (e.g. an avatar/icon). */
    sizes?: string;
    /** Marks this as decorative clinical content — avatar, thumbnail — vs. a large content image. */
    variant?: "avatar" | "thumbnail" | "content";
}
declare function Image({ variant, sizes, priority, ...rest }: ImageProps): React.JSX.Element;

/**
 * Wraps next/link so the sidebar/tab active-state logic (data-active, used
 * throughout globals.css) is computed once, correctly, instead of every
 * screen re-implementing `pathname === href` by hand.
 */
interface LinkProps extends LinkProps$1, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    children: ReactNode;
    /** Match sub-routes too, e.g. /patients/123 counts as active for href="/patients" */
    matchPrefix?: boolean;
}
declare function Link({ href, matchPrefix, className, children, ...rest }: LinkProps): React.JSX.Element;
/**
 * Drop-in for the NavItem organism — use this instead of NavItem + manual
 * active-state prop when the item is a real route (most sidebar items are).
 */
declare function NavLink({ href, icon, children, matchPrefix, }: {
    href: string;
    icon?: ReactNode;
    children: ReactNode;
    matchPrefix?: boolean;
}): React.JSX.Element;

interface FullEHRApplicationShellProps {
    currentPatient?: {
        name: string;
        mrn: string;
        age: number;
        gender: string;
        abhaId: string;
    };
    children: React__default.ReactNode;
    activeNav?: string;
    onNavSelect?: (navId: string) => void;
    className?: string;
}
declare function FullEHRApplicationShell({ currentPatient, children, activeNav, onNavSelect, className, }: FullEHRApplicationShellProps): React__default.JSX.Element;

interface MinimalApplicationShellProps {
    title: string;
    subtitle?: string;
    onBack?: () => void;
    onClose?: () => void;
    children: React__default.ReactNode;
    className?: string;
}
declare function MinimalApplicationShell({ title, subtitle, onBack, onClose, children, className, }: MinimalApplicationShellProps): React__default.JSX.Element;

interface MobileProviderShellProps {
    providerName: string;
    facilityName: string;
    children: React__default.ReactNode;
    activeTab?: string;
    onTabChange?: (tab: string) => void;
    className?: string;
}
declare function MobileProviderShell({ providerName, facilityName, children, activeTab, onTabChange, className, }: MobileProviderShellProps): React__default.JSX.Element;

interface KioskCheckinShellProps {
    facilityName: string;
    children: React__default.ReactNode;
    className?: string;
}
declare function KioskCheckinShell({ facilityName, children, className, }: KioskCheckinShellProps): React__default.JSX.Element;

interface AppointmentItem {
    id: string;
    time: string;
    patientName: string;
    age: number;
    gender: string;
    type: string;
    status: "Waiting" | "In-Progress" | "Completed";
}
interface ClinicalOverviewDashboardProps {
    providerName: string;
    appointments: AppointmentItem[];
    className?: string;
}
declare function ClinicalOverviewDashboard({ providerName, appointments, className, }: ClinicalOverviewDashboardProps): React__default.JSX.Element;

declare function PopulationHealthDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function FinancialRCMDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function OperationalMetricsDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function RealTimeMonitoringDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function WidgetBasedCustomDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function PatientRegistrationWizard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function Patient360Summary({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function PatientPortalHome({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function PatientJourneyTimeline({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function SoapClinicalNotes({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function MedicationAdministrationMar({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function LabOrderEntry({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function CarePlanCreation({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function ReferralManagement({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function ClinicalDecisionSupportTemplate({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function ClinicalReportsDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function RevenueCycleAnalytics({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function QualityMeasuresReport({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function FhirResourceViewer({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function Hl7MessageMonitor({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function AbdmGatewayDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function MedicationInventory({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function PharmacyOrderDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function NarcoticSubstanceLog({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function OrScheduleBoard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function SurgicalCountLog({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function PrePostOpCarePlan({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function Phq9Gad7Tracking({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function TherapyPlanViewer({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function RemoteMonitoringDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function HomeHealthScheduler({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function TriageDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function BedManagementSystem({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function EmergencyCodeManager({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function MassCasualtyCommander({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function MotherBabyChart({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function LaborProgressTracker({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function PediatricGrowthSchedule({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function UserManagement({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function SystemSettings({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function AuditLogsView({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function ComplianceDashboard({ className }: {
    className?: string;
}): React__default.JSX.Element;

interface HealthcareLoginProps {
    onGoogleLogin?: () => void;
    onAppleLogin?: () => void;
    onEmailLogin?: () => void;
    onPasswordLogin?: () => void;
    onSignupClick?: () => void;
    className?: string;
}
declare function HealthcareLogin({ onGoogleLogin, onAppleLogin, onEmailLogin, onPasswordLogin, onSignupClick, className, }: HealthcareLoginProps): React__default.JSX.Element;

declare function SignUpPage({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function ForgotPasswordPage({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function ClinicalHandoffView({ className }: {
    className?: string;
}): React__default.JSX.Element;

declare function SecureTeamMessaging({ className }: {
    className?: string;
}): React__default.JSX.Element;

interface MfaVerificationPageProps {
    className?: string;
    defaultMethod?: "sms" | "email" | "authenticator";
    phoneNumber?: string;
    email?: string;
    onVerify?: (code: string) => void;
    onBack?: () => void;
    onResend?: () => void;
}
declare function MfaVerificationPage({ className, defaultMethod, phoneNumber, email, onVerify, onBack, onResend }: MfaVerificationPageProps): React__default.JSX.Element;

interface ResetPasswordPageProps {
    className?: string;
    onReset?: (password: string) => void;
    onCancel?: () => void;
}
declare function ResetPasswordPage({ className, onReset, onCancel }: ResetPasswordPageProps): React__default.JSX.Element;

interface SessionTimeoutOverlayProps {
    className?: string;
    isOpen?: boolean;
    userFullName?: string;
    userRole?: string;
    onUnlock?: (password: string) => void;
    onLogout?: () => void;
}
declare function SessionTimeoutOverlay({ className, isOpen, userFullName, userRole, onUnlock, onLogout }: SessionTimeoutOverlayProps): React__default.JSX.Element | null;

interface MagicLinkLoginProps {
    className?: string;
    onRequestLink?: (email: string) => void;
    onUsePassword?: () => void;
}
declare function MagicLinkLogin({ className, onRequestLink, onUsePassword }: MagicLinkLoginProps): React__default.JSX.Element;

interface EnterpriseSsoLoginProps {
    className?: string;
    hospitalName?: string;
    onSsoLogin?: (provider: string) => void;
    onStaffLogin?: () => void;
    onPatientLogin?: () => void;
}
declare function EnterpriseSsoLogin({ className, hospitalName, onSsoLogin, onStaffLogin, onPatientLogin }: EnterpriseSsoLoginProps): React__default.JSX.Element;

interface UnifiedClinicalInboxProps {
    className?: string;
}
declare function UnifiedClinicalInbox({ className }: UnifiedClinicalInboxProps): React__default.JSX.Element;

interface PatientPortalMessagingProps {
    className?: string;
    patientName?: string;
}
declare function PatientPortalMessaging({ className, patientName }: PatientPortalMessagingProps): React__default.JSX.Element;

interface TelehealthWaitingRoomProps {
    className?: string;
    providerName?: string;
    appointmentTime?: string;
    onJoinCall?: () => void;
}
declare function TelehealthWaitingRoom({ className, providerName, appointmentTime, onJoinCall }: TelehealthWaitingRoomProps): React__default.JSX.Element;

export { ABDMConsentManager, type ABDMConsentManagerProps, ABHAHealthIDCard, type ABHAHealthIDCardProps, AbdmGatewayDashboard, Accordion, type AccordionItem, type AccordionProps, AdvancedDirective, type AdvancedDirectiveProps, Alert, AlertError, AlertInfo, type AlertProps, AlertSuccess, AlertWarning, AllergyManager, type AllergyManagerProps, type AppointmentItem, AuditLogsView, Autocomplete, type Option as AutocompleteOption, Avatar, AvatarGroup, type AvatarProps, Badge, BadgeGroup, type BadgeGroupProps, type BadgeProps, BaseSelector, BedManagementSystem, BentoCard, BentoGrid, BodyText, type BodyTextProps, Breadcrumb, type BreadcrumbProps, Breadcrumbs, type BubblePoint, Button, ButtonGroup, type ButtonGroupProps, type ButtonProps, type CDSRecord, CLINICAL_TOOLS, Caption, Card, CardContent, CardDescription, CardFooter, CardGrid, type CardGridProps, CardHeader, type CardProps, CardTitle, type CareContext, type CarePlan, type CarePlanActivity, CarePlanCreation, type CarePlanGoal, CarePlanViewer, type CarePlanViewerProps, Carousel, type CarouselProps, ChartArea, type ChartAreaProps, ChartBar, type ChartBarProps, ChartBubble, type ChartBubbleProps, type ChartDataPoint, ChartFunnel, type ChartFunnelProps, ChartGauge, type ChartGaugeProps, ChartHeatmap, type ChartHeatmapProps, ChartLine, type ChartLineProps, ChartPie, type ChartPieProps, ChartRadar, type ChartRadarProps, ChartSankey, type ChartSankeyProps, ChartScatter, type ChartScatterProps, ChartSparkline, type ChartSparklineProps, Checkbox, type CheckboxProps, type ClaimDenial, ClaimStatusTimeline, type ClaimStatusTimelineProps, type ClaimStep, ClickOutside, type ClickOutsideProps, ClinicalCopilot, type ClinicalCopilotProps, ClinicalDataChart, ClinicalDecisionSupport, type ClinicalDecisionSupportProps, ClinicalDecisionSupportTemplate, type ClinicalFinding, ClinicalFlowsheet, type ClinicalFlowsheetProps, ClinicalGuidelines, type ClinicalGuidelinesProps, ClinicalHandoffView, ClinicalImpression, type ClinicalImpressionProps, ClinicalOverviewDashboard, type ClinicalOverviewDashboardProps, ClinicalReportsDashboard, type ClinicalTreatment, Code, CodeBlock, CollectPaymentPanel, type CollectPaymentPanelProps, type ColorMode, ColorPicker, type ColorPickerProps, type ColorTheme, Combobox, type CommandItem, CommandPalette, type CommandPaletteProps, ComplianceDashboard, ConditionManager, type ConditionManagerProps, type ConditionStatus, type ConsentRequest, Container, type ContainerProps, CopyToClipboard, type CopyToClipboardProps, CountUp, DataGrid, type Column as DataGridColumn, type DataGridProps, DatePicker, type DateRange, DateRangeFilter, type DateRangeFilterProps, DateRangePicker, DenialAnalyticsCard, type DenialAnalyticsCardProps, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, type DropdownMenuProps, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuTrigger, type EducationMaterial, EligibilityChecker, type EligibilityCheckerProps, type EligibilityResult, EmergencyCodeManager, EmptyState, type EmptyStateProps, EncounterForm, type EncounterFormProps, EnterpriseSsoLogin, type EnterpriseSsoLoginProps, EnterpriseTopBar, ErrorBoundary, FamilyHistory, type FamilyHistoryItem, type FamilyHistoryProps, FavoriteOrdersPanel, type FavoriteOrdersPanelProps, FhirResourceViewer, Field, FileUpload, type FileUploadProps, FinancialRCMDashboard, FocusTrap, type FocusTrapProps, Footer, type FooterProps, ForgotPasswordPage, FullEHRApplicationShell, type FullEHRApplicationShellProps, Fullscreen, type FullscreenProps, type FunnelStage, GlobalSearchBox, type GoalItem, GoalTracker, type GoalTrackerProps, type GuidelineRule, Heading, type HeadingProps, HealthcareLogin, type HealthcareLoginProps, type HeatmapCell, Hl7MessageMonitor, HomeHealthScheduler, Hotkey, type HotkeyProps, IdleTimer, type IdleTimerProps, Image, type ImageProps, type ImmunizationItem, ImmunizationRecord, type ImmunizationRecordProps, type ImpressionItem, InAppNotification, type InAppNotificationProps, Input, InputGroup, InputGroupAddon, type InputGroupProps, type InputProps, KebabMenu, type KebabMenuProps, KeyboardShortcut, type KeyboardShortcutProps, KioskCheckinAlert, type KioskCheckinAlertProps, KioskCheckinShell, type KioskCheckinShellProps, LabOrderEntry, type LabResult, LabResultViewer, type LabResultViewerProps, LabResultsList, type LabResultsListProps, Label, LabelledProgress, type LabelledProgressProps, LaborProgressTracker, Lightbox, type LightboxProps, Link, List, ListItem, type ListItemProps, type ListProps, MagicLinkLogin, type MagicLinkLoginProps, Markdown, type MarkdownProps, Masonry, type MasonryProps, MassCasualtyCommander, type MedicationAdminItem, MedicationAdministration, MedicationAdministrationMar, type MedicationAdministrationProps, MedicationInventory, MedicationList, type MedicationListProps, MegaMenu, type MegaMenuCategory, type MegaMenuItem, type MegaMenuProps, type MenuGroup, type MenuItem, MfaVerificationPage, type MfaVerificationPageProps, MinimalApplicationShell, type MinimalApplicationShellProps, MobileProviderShell, type MobileProviderShellProps, Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalOverlay, ModalPortal, ModalTitle, ModalTrigger, MotherBabyChart, MultiSelect, type Option$1 as MultiSelectOption, NarcoticSubstanceLog, NavItem, type NavItemProps, NavLink, NotificationCenter, type NotificationItem, NotificationPopover, type NotificationPopoverProps, NotificationProvider, type NotificationProviderProps, NotificationSettings, type NotificationType, NursingHandoffReport, type NursingHandoffReportProps, OTPInput, type OTPInputProps, ObservationTrend, type ObservationTrendProps, OperationalMetricsDashboard, OrScheduleBoard, type OrderTemplate, Pagination, PaginationContent, PaginationItem, PaginationLink, Patient360Summary, PatientBanner, type PatientBannerProps, PatientEducation, type PatientEducationProps, PatientJourneyTimeline, PatientPortalHome, PatientPortalMessaging, type PatientPortalMessagingProps, PatientRegistrationWizard, PatientSearch, type PatientSearchProps, type PatientSearchResult, PatientSelector, PatientSummary, type PatientSummaryData, type PatientSummaryProps, PatientTimeline, type PatientTimelineProps, PatientTimelineView, PediatricGrowthSchedule, type PerioRecord, PharmacyOrderDashboard, Phq9Gad7Tracking, Popover, PopoverContent, PopoverTrigger, PopulationHealthDashboard, Portal, type PortalProps, type PreChartData, PreChartPanel, type PreChartPanelProps, PrePostOpCarePlan, ProcedureHistory, type ProcedureHistoryProps, type ProcedureItem, Progress, type ProgressProps, ProviderSelector, QRCode, type QRCodeProps, QualityMeasure, type QualityMeasureData, type QualityMeasureProps, QualityMeasuresReport, type RadarMetric, Radio, RadioCard, RadioGroup, type RadioGroupProps, type RadioProps, RealTimeMonitoringDashboard, ReferralManagement, RemoteMonitoringDashboard, ResetPasswordPage, type ResetPasswordPageProps, ResizeHandle, type ResizeHandleProps, RevenueCycleAnalytics, RiskAssessment, type RiskAssessmentProps, type RiskScore, type SankeyFlow, type SbarReport, type ScatterDataPoint, ScrollArea, type ScrollAreaProps, ScrollBar, type ScrollableTabItem, type SearchResult, Section, type SectionProps, SecureTeamMessaging, SegmentedControl, type SegmentedControlProps, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, type SelectProps, SelectSeparator, SelectTrigger, SelectValue, type SelectorOption, type SelectorProps, Separator, SessionTimeoutOverlay, type SessionTimeoutOverlayProps, Sheet, type SheetProps, Shell, Sidebar, SignUpPage, SignatureCapture, type SignatureCaptureProps, Skeleton, SkeletonCard, SkeletonCircle, SkeletonTable, SkeletonTableRows, SkipLink, Slider, type SliderProps, type SmartPhrase, SmartPhrasePanel, type SmartPhrasePanelProps, SoapClinicalNotes, type SocialDeterminant, SocialHistory, type SocialHistoryProps, Spinner, type SpinnerProps, SplitButton, type SplitButtonProps, StatCard, type StatCardProps, StepIndicator, type StepIndicatorProps, SurgicalCountLog, SuspenseWrapper, type SuspenseWrapperProps, Switch, type SwitchProps, SystemSettings, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsScrollable, type TabsScrollableProps, TabsTrigger, TabsVertical, type TabsVerticalProps, Tag, type TagProps, TelehealthWaitingRoom, type TelehealthWaitingRoomProps, type TenantTheme, TenantThemeProvider, Textarea, type TextareaProps, ThemeProvider, ThemeSelector, TherapyPlanViewer, TimePicker, Timeline, type TimelineEvent$2 as TimelineEvent, type TimelineEventType, type TimelineProps, Toast, ToastAction, type ToastActionElement, ToastClose, ToastDescription, type ToastProps, ToastProvider, ToastTitle, ToastViewport, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, type ToothAttachment, ToothChart, type ToothChartProps, type ToothChartState, type ToothData, type ToothHistoryEvent, ToothInspectorPanel, type ToothNote, type ToothSurface, TopNav, type TopNavProps, TreatmentPlanWorkspace, type TreeNode, TreeView, type TreeViewProps, TriageDashboard, TypographySpecimen, UnifiedClinicalInbox, type UnifiedClinicalInboxProps, type UnsignedChartItem, UnsignedChartsCard, type UnsignedChartsCardProps, UserManagement, type TabItem as VerticalTabItem, type VirtualColumn, VirtualizedTable, type VirtualizedTableProps, WidgetBasedCustomDashboard, Wizard, type WizardProps, type WizardStep, buttonVariants, expandSurfaceGroup, useDebounce, useNotifications, useTenantTheme, useTheme, useThrottle };
