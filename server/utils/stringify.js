export default function stringifyArray(values) {
    return values.map(value => typeof value === 'string' ? value : JSON.stringify(value));
}