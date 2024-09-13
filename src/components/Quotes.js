import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from '@mui/material';
import { FixedSizeList } from 'react-window';

export default function Quotes() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        // Show the initial message for 5 seconds
        const timer = setTimeout(() => {
            setShowMessage(false); // Hide the default message

            // Fetch the quote after the message is hidden
            const fetchQuote = async () => {
                try {
                    const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
                        headers: {
                            'X-Api-Key': process.env.REACT_APP_NINJAS_QUOTES_API_KEY
                        },
                    });
                    const quoteData = response.data[0];

                    setQuote(quoteData.quote);
                    setAuthor(quoteData.author);
                } catch (error) {
                    console.error('Error fetching quote:', error);
                }
            };

            fetchQuote();
        }, 5000); // 5000 milliseconds to show the message for 5 seconds

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []); // Empty dependency array to run effect only on mount

    return (
        <>
            {showMessage ? (
                <p>Don't miss out on important tasks anymore</p>
            ) : (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '400px', overflow: 'auto', padding: '20px' }}>
                        <p>{quote}</p>
                    </Box>
                    <br />
                    {/* <Box>
                        <p>{author}</p>
                    </Box> */}
                </>
            )}
        </>
    );
}
