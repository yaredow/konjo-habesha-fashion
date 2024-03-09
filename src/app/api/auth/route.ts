export async function POST(req: Request, res: Response) {
  const { name, email, password, passwordConfirm } = await req.json();
}
