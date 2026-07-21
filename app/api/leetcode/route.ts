export async function GET() {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://leetcode.com/",
      },
      body: JSON.stringify({
        query: `
          query {
            matchedUser(username: "diya_kalra") {
              submissionCalendar
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
    }

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return Response.json(
      { error: "Failed to fetch LeetCode data", details: String(error) },
      { status: 500 }
    );
  }
}

