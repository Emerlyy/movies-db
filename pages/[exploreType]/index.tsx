import movieApi from "client";
import ItemCard from "components/ItemCard";
import Sidebar from "components/Sidebar";
import { useQuery } from "hooks/useQuery";
import { Box, Container, Pagination, Paper, Typography } from "@mui/material";
import Head from "next/head";
import { ApiType, Genre, LocalItemGeneral, Options, Rating, SortingType } from "types";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { extractExploreOptions } from "utils";

interface ExploreProps {
    items: LocalItemGeneral[],
    currentPage: number,
    totalPages: number,
    allGenres: Genre[],
    exploreType: ApiType,
    options: Options
}

export interface ExploreOptions extends Pick<Required<Options>, 'sortingType'> {
    rating: Rating,
    genres: number[]
}

const ExplorePage = ({ items, totalPages, currentPage, allGenres, exploreType, options }: ExploreProps) => {
    const [setData, , changeData] = useQuery();

    const handleSidebarSubmit = (sortingType: SortingType, rating: Rating, genres: number[]) => {
        if (genres.length) {
            setData({ exploreType, page: 1, sortingType, ratingLower: rating[0], ratingHigher: rating[1], genres: genres.toString() })
        }
        else {
            setData({ exploreType, page: 1, sortingType, ratingLower: rating[0], ratingHigher: rating[1] })
        }
    };

    const handlePageChange = (_: never, value: number) => {
        changeData({ page: value });
    };

    const exploreOptions = extractExploreOptions(options);

    return (
        <>
            <Head>
                <title>{exploreType}</title>
            </Head>
            <Box sx={{ display: 'flex' }}>
                <Sidebar options={exploreOptions} onSubmit={handleSidebarSubmit} genres={allGenres} />
                <Paper square variant="outlined" sx={{ flexGrow: 1, py: 6 }}>
                    <Container>
                        <Typography sx={{ display: { sm: 'block', md: 'none' } }} variant="h4" component='h1' align="center" mb={4}>{exploreType}</Typography>
                        {
                            items.length
                                ? <Box mb={4} sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: 'repeat(auto-fit, minmax(120px, 33%))', sm: 'repeat(auto-fit, 160px)', md: 'repeat(auto-fit, 180px)' }, justifyContent: 'center' }}>
                                    {
                                        items && items.map((item) => <ItemCard maxWidth='100%' imgHeight={{ xs: 225, sm: 250, md: 270 }} key={item.id} title={item.title} releaseDate={item.release} posterPath={item.poster} imgSize='md' path={`${exploreType}/${item.id}`} />)
                                    }
                                </Box>
                                : <Typography component='h2'>No items were found that match your query.</Typography>
                        }
                        <Pagination sx={{ marginX: 'auto', width: 'fit-content' }} size='small' siblingCount={1} count={Math.min(totalPages, 500)} variant="outlined" shape="rounded" page={currentPage} onChange={handlePageChange} />
                    </Container>
                </Paper>
            </Box>
        </>
    )
};

interface ExploreContextParams extends ParsedUrlQuery { exploreType: ApiType }

interface ExploreQuery extends ExploreContextParams, Options { }

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { exploreType } = context.params as ExploreContextParams;

    const query: ExploreQuery = context.query as ExploreQuery;

    for (const value of Object.values(query)) {
        if (!value) {
            return {
                notFound: true
            }
        }
    }

    const options: Options = {
        page: query.page || '1',
        sortingType: query.sortingType || 'popularity.desc',
        ratingHigher: query.ratingHigher || '10',
        ratingLower: query.ratingLower || '0',
        genres: query.genres || ''
    }

    const data = await movieApi[exploreType].explore(options);
    const genres = await movieApi[exploreType].getGenres();

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            items: data.results,
            page: data.page,
            totalPages: data.total_pages,
            options,
            allGenres: genres,
            exploreType
        }
    }
}

export default ExplorePage;