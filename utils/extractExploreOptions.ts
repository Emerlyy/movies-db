import { ExploreOptions } from "pages/[exploreType]";
import { Options } from "types";

export const extractExploreOptions = (options: Options): ExploreOptions => {
    return {
        sortingType: options.sortingType || 'popularity.desc',
        rating: [Number.parseInt(options.ratingLower || '0'), Number.parseInt(options.ratingHigher || '10')],
        genres: options.genres ? options.genres.split(',').map(Number) : []
    }
}