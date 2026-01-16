"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "../../components/ui/card";

export default function Quotereact() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);

    try {
      const res = await fetch("https://www.dormtherapy.com/stranger-things-quotes-100010960");
      const data = await res.json();

      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      setQuote("Something strange happened in the Upside Down...");
      setAuthor("El");
      setQuote("Its Code Red I repeat Its Code Red")
      setAuthor("Dustin")
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black p-6">

      <Card className="w-full max-w-md bg-black/70 border border-pink-600 shadow-[0_0_25px_rgba(236,72,153,0.5)] backdrop-blur-md transition-all">

        <CardHeader>
          <CardTitle className="text-center text-2xl text-pink-500 tracking-widest font-mono drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
            STRANGER QUOTES
          </CardTitle>
        </CardHeader>

        <CardContent className="min-h-[150px] flex items-center justify-center text-center text-gray-200">

          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-pink-500 rounded-full"></div>
              <p className="text-sm text-purple-400">
                Searching the Upside Down...
              </p>
            </div>
          ) : (
            <div>
              <p className="italic text-lg text-gray-100 drop-shadow-md">
                "{quote}"
              </p>
              <p className="mt-3 font-semibold text-sm text-pink-400">
                – {author}
              </p>
            </div>
          )}

        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={fetchData}
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold shadow-lg shadow-pink-900 transition-all"
          >
            {loading ? "Loading..." : "Find Another Quote"}
          </Button>
        </CardFooter>

      </Card>

    </div>
  );
}
