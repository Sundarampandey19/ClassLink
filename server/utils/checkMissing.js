export default async function validateFields(values) {
    for (const [index, value] of values.entries()) {
        if (value === undefined || value === '') {
            return `Error: Missing or empty value at index ${index}`;
        }
    }
    return values;
}