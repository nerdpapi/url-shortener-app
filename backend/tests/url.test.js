import request from "supertest";
import app from "../src/app.js";

describe("URL Shortener API", () => {
  let shortId;

  it("should shorten a URL", async () => {
    const res = await request(app)
      .post("/api/url/shorten")
      .send({ originalUrl: "https://example.com" });
    
    expect(res.status).toBe(200);
    expect(res.body.shortUrl).toBeDefined();
    shortId = res.body.shortUrl.split("/").pop();
  });

  it("should redirect to original URL", async () => {
    const res = await request(app).get(`/api/url/${shortId}`);
    expect(res.status).toBe(301); // redirect status
    expect(res.headers.location).toBe("https://example.com");
  });
});
