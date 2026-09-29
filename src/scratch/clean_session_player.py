with open("/home/server/MudraProject/Mudraweb/src/components/PlaySession/SessionPlayerHero.jsx", "r") as f:
    lines = f.readlines()

end_idx = 0
for i, line in enumerate(lines):
    if i > 1580 and line.strip() == "}":
        end_idx = i + 1
        break

if end_idx > 0:
    clean_lines = lines[:end_idx]
    with open("/home/server/MudraProject/Mudraweb/src/components/PlaySession/SessionPlayerHero.jsx", "w") as f:
        f.writelines(clean_lines)
    print("Cleaned SessionPlayerHero.jsx successfully. Total lines:", len(clean_lines))
