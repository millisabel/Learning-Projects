export function getOptions(btn) {
    if (btn.dataset.level === 'easy') {
        return {
            rows: 10,
            columns: 10,
            mines: 10,
        }
    } else if (btn.dataset.level === 'middle') {
        return {
            rows: 15,
            columns: 15,
            mines: 30,
        }
    } else if (btn.dataset.level === 'heavy') {
        return {
            rows: 20,
            columns: 20,
            mines: 40,
        }
    }
}