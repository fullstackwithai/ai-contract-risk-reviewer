import http from 'node:http';

const PORT = process.env.PORT || 8787;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/analyze-contract') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      try {
        const { contractText } = JSON.parse(body || '{}');
        if (!contractText) return json(res, 400, { error: 'contractText is required' });
        if (!OPENAI_API_KEY) return json(res, 200, mockAnalysis(contractText));

        const response = await fetch('https://api.openai.com/v1/responses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4.1-mini',
            input: `Review this contract for business risks. Return concise JSON with summary, riskScore, risks, and negotiationEmail. Contract: ${contractText}`,
          }),
        });
        const data = await response.json();
        return json(res, 200, data);
      } catch (error) {
        return json(res, 500, { error: 'Analysis failed', detail: String(error.message || error) });
      }
    });
    return;
  }
  json(res, 404, { error: 'Not found' });
});

function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(payload, null, 2));
}

function mockAnalysis(contractText) {
  return {
    summary: 'Mock analysis returned because OPENAI_API_KEY is not set.',
    riskScore: contractText.length > 500 ? 72 : 64,
    risks: ['Review payment timing', 'Check liability limits', 'Clarify termination notice'],
    negotiationEmail: 'Thanks for sending this agreement. I would like to clarify payment timing, liability limits, and termination obligations before signing.',
  };
}

server.listen(PORT, () => console.log(`AI contract reviewer API running on http://localhost:${PORT}`));
