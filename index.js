require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);


app.post('/ask-jiji', async (req, res) => {
    try {
        const { query, userId } = req.body;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing "query" field.' });
        }
        if (!userId) {
            return res.status(401).json({ error: 'User ID is required (Mock Auth).' });
        }

        const aiAnswer = `Here is what I found about "${query}". RAG combines search with LLMs to improve accuracy.`;

        const { data: resources, error: resourceError } = await supabase
            .from('resources')
            .select('*')
            .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
            .limit(3);

        if (resourceError) throw resourceError;

        const finalResources = resources.length > 0 ? resources :
            (await supabase.from('resources').select('*').limit(3)).data;

        const { error: logError } = await supabase
            .from('queries')
            .insert([
                {
                    user_id: userId,
                    query_text: query,
                    response_text: aiAnswer
                }
            ]);

        if (logError) {
            console.error('Failed to log query:', logError);
        }

        return res.status(200).json({
            answer: aiAnswer,
            resources: finalResources.map(r => ({
                title: r.title,
                type: r.type,
                url: r.url
            }))
        });

    } catch (err) {
        console.error('Server Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send('Jiji Backend is running!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});