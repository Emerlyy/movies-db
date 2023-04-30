import { Theme, ThemeOptions } from "@mui/material"


declare module '@mui/material/styles' {

    interface CustomTheme extends Theme {
        [key: string]: any,
        palette: {
            mode,
            [key: string]: any,
            neutral: {
                main: React.CSSProperties['color'],
            }
        },
        typography: {
            [key: string]: any;
            tagline: {
                fontSize: string,
                fontFamily: string
            },
            progress: {
                fontSize: string,
                fontFamily: string,
                [key: string]: any
            }
        }
    }

    interface CustomThemeOptions extends ThemeOptions {
        palette?: {
            mode?,
            [key: string]: any,
            neutral?: {
                main?: React.CSSProperties['color'];
            }
        },
        typography?: {
            [key: string]: any,
            tagline?: {
                fontSize?: string,
                fontFamily?: string
            },
            progress?: {
                fontSize?: string,
                fontFamily?: string,
                [key: string]: any
            }
        }

    }

    export function createTheme(options?: CustomThemeOptions): CustomTheme;
}

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        neutral: Palette['primary'];
    }
    interface PaletteOptions {
        neutral: PaletteOptions['primary'];
    }
}

declare module '@mui/material' {
    interface InputBasePropsColorOverrides {
        neutral: true
    }

    interface TextFieldPropsColorOverrides {
        neutral: true
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        tagline: true,
        progress: true
    }
}