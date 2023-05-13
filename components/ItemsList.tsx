import { Box, Typography } from "@mui/material";
import { LocalItemGeneral } from "types";
import ItemCard from "./ItemCard";

interface ItemsListProps {
    title: string,
    items: LocalItemGeneral[],
    type: string,
    sx?: { [key: string]: any }
}

const ItemsList = ({ title, items, type, sx }: ItemsListProps) => {
    return (
        <Box sx={{ ...sx }}>
            <Typography mb={1} fontWeight={700} variant="h5" component="h3">{title}</Typography>
            {
                items.length &&
                <Box sx={{
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        width: 60,
                        background: 'linear-gradient(to right, var(--color-fade-start), var(--color-fade-end))'
                    }
                }}>
                    <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
                        {
                            items.map(({ title, release, poster, id }) => <ItemCard key={id} maxWidth={{ xs: 120, sm: 180, md: 260 }} imgHeight={{ xs: 180, sm: 270, md: 390 }} sx={{ flexShrink: 0 }} title={title} releaseDate={release} posterPath={poster} path={`${type}/${id}`} />)
                        }
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default ItemsList;