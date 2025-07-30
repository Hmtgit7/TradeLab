import React, { useState } from "react";
import {
    Button,
    TextField,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Stack,
    Box,
    Typography,
    useTheme,
} from "@mui/material";
import { getLiveStockPrice } from "../../api/stockApi";
import SearchIcon from "@mui/icons-material/Search";

const TickerSearch = ({ onSelectStock }) => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const theme = useTheme();


    // Use backend to search for tickers (for demo, use a static list or extend backend if needed)
    const fetchTickers = async () => {
        setLoading(true);
        try {
            // For demo, use a static list. Replace with backend call if you add a proxy endpoint.
            const staticTickers = [
                { symbol: "AAPL", name: "Apple Inc." },
                { symbol: "MSFT", name: "Microsoft Corporation" },
                { symbol: "GOOGL", name: "Alphabet Inc." },
                { symbol: "TSLA", name: "Tesla Inc." },
                { symbol: "AMZN", name: "Amazon.com Inc." },
            ];
            const filtered = staticTickers.filter(
                t => t.symbol.toLowerCase().includes(inputValue.toLowerCase()) ||
                     t.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setOptions(filtered);
        } catch (error) {
            console.error("Error fetching ticker data:", error);
        }
        setLoading(false);
    };

    const handleSelect = async (option) => {
        try {
            // Fetch live price from backend
            const priceData = await getLiveStockPrice(option.symbol);
            onSelectStock({ ...option, price: priceData.price });
        } catch (error) {
            onSelectStock(option); // fallback
        }
        setOptions([]);
        setInputValue("");
    };

    return (
        <Stack
            style={{
                backgroundColor: theme.palette.background.default,
                minHeight: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    padding: "40px",
                    borderRadius: "10px",
                    border: `2px solid ${theme.palette.accent.main}`, 
                    maxWidth: "600px",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        color: theme.palette.text.primary,
                        fontWeight: "bold",
                    }}
                >
                    Stock Ticker Search
                </Typography>
                <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                        color: theme.palette.text.secondary,
                        opacity: 0.7,
                        marginBottom: "20px",
                    }}
                >
                    Search for stock symbols and get real-time market data.
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        mb: 3,
                        alignItems: "center",
                        borderRadius: "8px",
                        padding: "10px 15px",
                    }}
                >
                    <TextField
                        label="Enter Stock Symbol or Name"
                        placeholder="e.g. AAPL, Tesla"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        fullWidth
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            borderRadius: "8px",
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={fetchTickers}
                        disabled={loading || !inputValue}
                        sx={{
                            backgroundColor: theme.palette.success.main,
                            color: "#fff",
                            textTransform: "none",
                            padding: "10px 20px",
                            "&:hover": {
                                backgroundColor: theme.palette.success.dark,
                            },
                        }}
                        startIcon={<SearchIcon />}
                    >
                        {loading ? (
                            <CircularProgress color="inherit" size={24} />
                        ) : (
                            "Search"
                        )}
                    </Button>
                </Stack>

                {options.length > 0 && (
                    <>
                        <List>
                            {options.map((option, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    onClick={() => handleSelect(option)}
                                    sx={{
                                        backgroundColor:
                                            theme.palette.background.default,
                                        borderRadius: "8px",
                                        mb: 2,
                                        padding: "10px 20px",
                                        transition:
                                            "background-color 0.3s ease",
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.action.hover,
                                        },
                                        boxShadow:
                                            "0px 2px 8px rgba(0, 0, 0, 0.05)",
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    fontWeight: "600",
                                                    color: theme.palette.text
                                                        .primary,
                                                }}
                                            >
                                                {`${option.symbol}`}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                variant="body2"
                                                style={{
                                                    color: theme.palette.text
                                                        .secondary,
                                                    opacity: 0.7,
                                                }}
                                            >
                                                {`${option.name}`}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </Box>
        </Stack>
    );
};

export default TickerSearch;
