export default function () {
    Array.prototype.remove = function (val) {
        for (let i = 0; i < this.length;) {
            if (this[i] === val) {
                this.splice(i, 1);
            } else {
                i++;
            }
        }
    };
}
