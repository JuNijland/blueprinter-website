const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxWIsT_kgDHnX5CiigLzOp8_mC6Y-cCQikVLYPC-9i-e4BZLJwS99OdBVUcAGP57mDLQQ/exec";

export async function onRequestPost({ request }: { request: Request }) {
  const body = await request.text();

  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body,
  });

  const data = await res.text();

  return new Response(data, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
