import Point from "./point.js";

const boundaries = [
    22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5
];

function rtod(r) {
    return r * 180 / Math.PI;
}


export default function regionFactory(element) {

    const rect = element.getBoundingClientRect();
    const center = new Point(
        rect.width / 2,
        rect.height / 2
    );

    return function getRegion(e) {

        const touch = e.targetTouches[0];

        if (!touch) {
            return null;
        }

        const point = new Point(touch.pageX - rect.left, touch.pageY - rect.top);

        const catetoAdjacente = point.x - center.x;
        const catetoOposto = point.y - center.y;
        const hipotenusa = Math.sqrt(
            (catetoAdjacente * catetoAdjacente) +
            (catetoOposto * catetoOposto)
        );
        const seno = catetoOposto / hipotenusa;

        let angulo = rtod(Math.asin(seno));

        if (catetoAdjacente < 0) {
            angulo = 180 - angulo;
        } else if (catetoAdjacente >= 0 && catetoOposto < 0) {
            angulo = 360 + angulo;
        }

        let region = 0;
        for (let i = 0; i < boundaries.length; i++) {
            const element = boundaries[i];
            if (angulo < element) {
                region = i;
                break;
            }
        }

        return region;
    };
}

