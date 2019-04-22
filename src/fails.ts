async function helper() {
  await fetch('https://www.example.com');
}

export async function main() {
  await helper();
}
