// Changes also in Backend

export interface User {
    username: String,
    password: String,
    plants : [{
        name : String,
        beschreibung : String,
        raum : String,
        kategorie : String,
        lichtbedarf_min :  Number,
        lichtbedarf_max : Number,
        wasser_min : Number,
        wasser_max : Number,
        boden : String,
        temperatur_min : Number,
        temperatur_max : Number,
        alive : Boolean,
        waesserungen : [Date],
        _id : String
    }]
}
