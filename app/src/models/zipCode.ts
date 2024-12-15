export type PlacesZippopotamDataType = {
    _id: string;
    place_name: string;
    longitude: string;
    state: string;
    state_abbreviation: string;
    latitude: string;
}

export type ZippopotamDataType = {
    post_code: string;
    country: string;
    country_abbreviation: string;
    places: PlacesZippopotamDataType[];
}