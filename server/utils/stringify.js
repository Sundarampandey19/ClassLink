export default function stringifyArray(values) {
    return values.map(value => JSON.stringify(value));
}