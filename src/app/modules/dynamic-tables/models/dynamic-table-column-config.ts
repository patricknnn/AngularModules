export class DynamicTableColumnConfig {
    name!: string;
    displayName!: string;
    type?: string;
    sticky?: "start" | "end";
    sortable?: boolean;
    draggable?: boolean;
}