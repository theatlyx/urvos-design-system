/* ==========================================================================
   BARREL EXPORT — urvos-design-system
   ========================================================================== */

/* ---------- UI primitives --------------------------------------------- */
export { Combobox } from "./patterns/Combobox";
export { BentoCard, BentoGrid } from "./patterns/bento";
export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from "./patterns/Table";
export { Button, buttonVariants } from "./ui/Button";
export type { ButtonProps } from "./ui/Button";

export { Field, Input } from "./ui/Form";
export type { InputProps } from "./ui/Form";

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator } from "./ui/Select";
export type { SelectProps } from "./ui/Select";

export { Textarea } from "./ui/Textarea";
export type { TextareaProps } from "./ui/Textarea";

export { Switch } from "./ui/Switch";
export type { SwitchProps } from "./ui/Switch";

export { Checkbox } from "./ui/Checkbox";
export type { CheckboxProps } from "./ui/Checkbox";

export { RadioGroup, Radio } from "./ui/RadioGroup";
export type { RadioProps, RadioGroupProps } from "./ui/RadioGroup";

export { MultiSelect } from "./ui/MultiSelect";
export type { Option as MultiSelectOption } from "./ui/MultiSelect";

export { Autocomplete } from "./ui/Autocomplete";
export type { Option as AutocompleteOption } from "./ui/Autocomplete";

export { FileUpload } from "./ui/FileUpload";
export type { FileUploadProps } from "./ui/FileUpload";

export { Badge } from "./ui/Badge";
export type { BadgeProps } from "./ui/Badge";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/Card";
export type { CardProps } from "./ui/Card";

export { Modal, ModalTrigger, ModalPortal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalClose } from "./ui/Modal";
export { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose } from "./ui/Drawer";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/Tooltip";

export { Toast, ToastAction, ToastClose, ToastDescription, ToastTitle, ToastProvider, ToastViewport } from "./ui/Toast";
export type { ToastComponentProps as ToastProps, ToastActionElement } from "./ui/Toast";

export { DatePicker } from "./ui/DatePicker";
export { DateRangePicker } from "./ui/DateRangePicker";
export { TimePicker } from "./ui/TimePicker";

export { Avatar, AvatarGroup, EmptyState, Skeleton, SkeletonCard, SkeletonTableRows, SkeletonCircle, SkeletonTable } from "./ui/Feedback";
export type { AvatarProps, EmptyStateProps } from "./ui/Feedback";

export { Alert, AlertInfo, AlertSuccess, AlertWarning, AlertError } from "./ui/Alert";
export type { AlertProps } from "./ui/Alert";

export { Spinner } from "./ui/Spinner";
export type { SpinnerProps } from "./ui/Spinner";

export { Progress, LabelledProgress } from "./ui/Progress";
export type { ProgressProps, LabelledProgressProps } from "./ui/Progress";

export { StatCard } from "./ui/StatCard";
export type { StatCardProps } from "./ui/StatCard";

export { Timeline } from "./ui/Timeline";
export type { TimelineProps, TimelineEvent } from "./ui/Timeline";

export { Accordion } from "./ui/Accordion";
export type { AccordionProps, AccordionItem } from "./ui/Accordion";

export { Slider } from "./ui/Slider";
export type { SliderProps } from "./ui/Slider";

export { DropdownMenu, DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator, DropdownMenuLabel } from "./ui/DropdownMenu";
export type { DropdownMenuProps, MenuItem, MenuGroup } from "./ui/DropdownMenu";

export { CommandPalette } from "./ui/CommandPalette";
export type { CommandPaletteProps, CommandItem } from "./ui/CommandPalette";

export { TreeView } from "./ui/TreeView";
export type { TreeViewProps, TreeNode } from "./ui/TreeView";

export { Heading, BodyText, Caption, Label, Code, CodeBlock, TypographySpecimen } from "./ui/Typography";
export type { HeadingProps, BodyTextProps } from "./ui/Typography";

export { Popover, PopoverTrigger, PopoverContent } from "./ui/Popover";
export { RadioCard } from "./ui/RadioCard";
export { ToggleGroup, ToggleGroupItem } from "./ui/ToggleGroup";

/* ---------- Layout ---------------------------------------------------- */
export { Container, Section } from "./layout/Layout";
export type { ContainerProps, SectionProps } from "./layout/Layout";
export { EnterpriseTopBar } from "./layout/EnterpriseTopBar";
export { Footer } from "./ui/Footer";
export type { FooterProps } from "./ui/Footer";
export { Sheet } from "./patterns/Sheet";
export type { SheetProps } from "./patterns/Sheet";
export { ScrollArea, ScrollBar } from "./ui/ScrollArea";
export { Separator } from "./ui/Separator";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
export { CardGrid } from "./layout/CardGrid";
export type { CardGridProps } from "./layout/CardGrid";
export { BadgeGroup, ButtonGroup, InputGroup, InputGroupAddon } from "./layout/Groups";
export type { BadgeGroupProps, ButtonGroupProps, InputGroupProps } from "./layout/Groups";
export { List, ListItem } from "./layout/Lists";
export type { ListProps, ListItemProps } from "./layout/Lists";
export { DataGrid } from "./layout/DataGrid";
export type { DataGridProps, Column as DataGridColumn } from "./layout/DataGrid";
export { VirtualizedTable } from "./layout/VirtualizedTable";
export type { VirtualizedTableProps, VirtualColumn } from "./layout/VirtualizedTable";
export { Carousel } from "./layout/Carousel";
export type { CarouselProps } from "./layout/Carousel";
export { Masonry } from "./layout/Masonry";
export type { MasonryProps } from "./layout/Masonry";

/* ---------- Navigation ------------------------------------------------ */
export { Breadcrumb, NavItem } from "./navigation/Navigation";
export type { BreadcrumbProps, NavItemProps } from "./navigation/Navigation";
export { Breadcrumbs } from "./navigation/Breadcrumbs";
export { SkipLink } from "./navigation/SkipLink";
export { MegaMenu } from "./navigation/MegaMenu";
export type { MegaMenuProps, MegaMenuCategory, MegaMenuItem } from "./navigation/MegaMenu";
export { Pagination, PaginationContent, PaginationItem, PaginationLink } from "./navigation/Pagination";
export { Sidebar } from "./navigation/Sidebar";
export { TopNav } from "./organisms/Shell";
export type { TopNavProps } from "./organisms/Shell";
export { StepIndicator } from "./navigation/StepIndicator";
export type { StepIndicatorProps } from "./navigation/StepIndicator";
export { TabsScrollable } from "./navigation/TabsScrollable";
export type { TabsScrollableProps, ScrollableTabItem } from "./navigation/TabsScrollable";
export { TabsVertical } from "./navigation/TabsVertical";
export type { TabsVerticalProps, TabItem as VerticalTabItem } from "./navigation/TabsVertical";
export { Wizard } from "./navigation/Wizard";
export type { WizardProps, WizardStep } from "./navigation/Wizard";

/* ---------- Overlays -------------------------------------------------- */
export { Fullscreen } from "./overlays/Fullscreen";
export type { FullscreenProps } from "./overlays/Fullscreen";
export { Lightbox } from "./overlays/Lightbox";
export type { LightboxProps } from "./overlays/Lightbox";
export { InAppNotification } from "./overlays/InAppNotification";
export type { InAppNotificationProps } from "./overlays/InAppNotification";

/* ---------- Utilities ------------------------------------------------- */
export { ClickOutside } from "./utilities/ClickOutside";
export type { ClickOutsideProps } from "./utilities/ClickOutside";
export { useDebounce } from "./utilities/Debounce";
export { FocusTrap } from "./utilities/FocusTrap";
export type { FocusTrapProps } from "./utilities/FocusTrap";
export { Hotkey } from "./utilities/Hotkey";
export type { HotkeyProps } from "./utilities/Hotkey";
export { IdleTimer } from "./utilities/IdleTimer";
export type { IdleTimerProps } from "./utilities/IdleTimer";
export { KeyboardShortcut } from "./utilities/KeyboardShortcut";
export type { KeyboardShortcutProps } from "./utilities/KeyboardShortcut";
export { Portal } from "./utilities/Portal";
export type { PortalProps } from "./utilities/Portal";
export { ErrorBoundary } from "./utilities/ErrorBoundary";
export { CountUp } from "./utilities/CountUp";
export { SuspenseWrapper } from "./utilities/SuspenseWrapper";
export type { SuspenseWrapperProps } from "./utilities/SuspenseWrapper";
export { useThrottle } from "./utilities/Throttle";
export { ThemeProvider, useTheme } from "./utilities/ThemeProvider";
export type { ColorTheme, ColorMode } from "./utilities/ThemeProvider";
/* ---------- Advanced & Misc ------------------------------------------- */
export * from "./advanced/Advanced";
export * from "./misc/Misc";

/* ---------- Specialized Charts --------------------------------------- */
export { ChartArea } from "./charts/ChartArea";
export type { ChartAreaProps } from "./charts/ChartArea";
export { ChartBar } from "./charts/ChartBar";
export type { ChartBarProps } from "./charts/ChartBar";
export { ChartLine } from "./charts/ChartLine";
export type { ChartLineProps } from "./charts/ChartLine";
export { ChartPie } from "./charts/ChartPie";
export type { ChartPieProps } from "./charts/ChartPie";
export { ChartScatter } from "./charts/ChartScatter";
export type { ChartScatterProps, ScatterDataPoint } from "./charts/ChartScatter";
export { ChartRadar } from "./charts/ChartRadar";
export type { ChartRadarProps, RadarMetric } from "./charts/ChartRadar";
export { ChartGauge } from "./charts/ChartGauge";
export type { ChartGaugeProps } from "./charts/ChartGauge";
export { ChartHeatmap } from "./charts/ChartHeatmap";
export type { ChartHeatmapProps, HeatmapCell } from "./charts/ChartHeatmap";
export { ChartSparkline } from "./charts/ChartSparkline";
export type { ChartSparklineProps } from "./charts/ChartSparkline";
export { ChartFunnel } from "./charts/ChartFunnel";
export type { ChartFunnelProps, FunnelStage } from "./charts/ChartFunnel";
export { ChartSankey } from "./charts/ChartSankey";
export type { ChartSankeyProps, SankeyFlow } from "./charts/ChartSankey";
export { ChartBubble } from "./charts/ChartBubble";
export type { ChartBubbleProps, BubblePoint } from "./charts/ChartBubble";

/* ---------- FHIR Healthcare Organisms -------------------------------- */
export * from "./healthcare/AllergyManager";
export * from "./healthcare/ClinicalDecisionSupport";
export * from "./healthcare/ClinicalFlowsheet";
export * from "./healthcare/ClinicalImpression";
export * from "./healthcare/ClinicalRecords";
export * from "./healthcare/ClinicalViewers";
export * from "./healthcare/DateRangeFilter";
export * from "./healthcare/EncounterForm";
export * from "./healthcare/FamilyHistory";
export * from "./healthcare/GoalTracker";
export * from "./healthcare/ImmunizationRecord";
export * from "./healthcare/MedicationAdministration";
export * from "./healthcare/MedicationList";
export * from "./healthcare/NotificationSystem";
export * from "./healthcare/ObservationTrend";
export * from "./healthcare/PatientBanner";
export * from "./healthcare/PatientEducation";
export * from "./healthcare/PatientSearch";
export * from "./healthcare/PatientSummary";
export * from "./healthcare/PatientTimeline";
export * from "./healthcare/QualityMeasure";
export * from "./healthcare/RiskAssessment";
export * from "./healthcare/Selectors";
export * from "./healthcare/SocialHistory";
export * from "./healthcare/ABDMConsentManager";
export * from "./healthcare/ABHAHealthIDCard";
export * from "./healthcare/ClaimStatusTimeline";
export * from "./healthcare/EligibilityChecker";
export * from "./healthcare/DenialAnalyticsCard";
export * from "./healthcare/HandoffReport";
export * from "./healthcare/PreChartPanel";
export * from "./healthcare/UnsignedChartsCard";
export * from "./healthcare/SmartPhrasePanel";
export * from "./healthcare/FavoriteOrdersPanel";
export * from "./healthcare/SignatureCapture";
export * from "./healthcare/CollectPaymentPanel";
export * from "./healthcare/KioskCheckinAlert";
export * from "./healthcare/ClinicalGuidelines";
export * from "./healthcare/AdvancedDirective";
export * from "./healthcare/PatientTimelineView";
export * from "./healthcare/ClinicalDataChart";
export * from "./healthcare/ConditionManager";
export * from "./healthcare/LabResultsList";
export * from "./healthcare/ClinicalCopilot";
export * from "./healthcare/ToothChart";
export * from "./healthcare/ToothInspector";
export * from "./healthcare/TreatmentPlanWorkspace";

/* ---------- Shell & Tenant Organisms ---------------------------------- */
export { Shell } from "./organisms/Shell";
export { TenantThemeProvider, useTenantTheme } from "./organisms/TenantThemeProvider";
export type { TenantTheme } from "./organisms/TenantThemeProvider";
export { ThemeSelector } from "./organisms/ThemeSelector";
export { GlobalSearchBox } from "./organisms/GlobalSearchBox";
export type { SearchResult } from "./organisms/GlobalSearchBox";
/* ---------- Next.js-specific lib wrappers ---------------------------- */
export { Image } from "../lib/Image";
export type { ImageProps } from "../lib/Image";
export { Link, NavLink } from "../lib/Link";

/* ---------- Storybook Templates System --------------------------------- */
export * from "./templates";

