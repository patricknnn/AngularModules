/**
 * @description
 * Class for dynamic table options
 */
export class DynamicTableOptions {
    /**
     * Form control value
     */
    value: string | undefined;

    /**
     * Initialize the DynamicTableOptions instance
     * @param options Object containing dynamic table options
     */
    constructor(options: {
        value?: string | undefined,
    }) {
        this.value = options.value;
    }
}