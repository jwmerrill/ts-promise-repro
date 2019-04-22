async function helper() {
  await fetch('https://www.example.com');
  return true;
}

export async function main() {
  await helper();
}
