// Helper function to retry API calls with exponential backoff
const retryApiCall = async (apiCall, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Attempt the API call
            return await apiCall();
        } catch (error) {
            // Log the failed attempt
            console.error(`API call attempt ${attempt} failed:`, error.message);
            
            // If it's the last attempt, re-throw the error
            if (attempt === maxRetries) {
                throw error;
            }
            
            // Wait for an exponentially increasing time before the next retry
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
};

module.exports = { retryApiCall }; 