const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = '/home/server/.gemini/antigravity/brain/afbdbae4-5066-490a-aab8-948d8cb9bb23';

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const targetUrl = 'http://localhost:3000/PlaySession?id=yspepgl53nxklm3e3cvuwdrf&type=mudra&mode=timer&duration=300';
  console.log("Navigating to:", targetUrl);
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });

  // 1. Capture Player Initial Screen
  const shot1 = path.join(ARTIFACT_DIR, 'step1_player_screen.png');
  await page.screenshot({ path: shot1 });
  console.log("Captured Step 1:", shot1);

  // 2. Click "Add to playlist" (PlusCircle button or Playlist button)
  // Let's find button with aria-label="Add to playlist"
  const addButton = await page.$('button[aria-label="Add to playlist"]');
  if (addButton) {
    await addButton.click();
    console.log("Clicked Add to Playlist button");
  } else {
    // Try clicking Playlist button in action grid
    console.log("Add button not found by aria-label, looking for Playlist button...");
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Playlist')) {
        await btn.click();
        break;
      }
    }
  }

  await page.waitForTimeout(1000);
  const shot2 = path.join(ARTIFACT_DIR, 'step2_playlist_modal.png');
  await page.screenshot({ path: shot2 });
  console.log("Captured Step 2:", shot2);

  // 3. Check if Add to playlist modal is open, or click "Add to playlist" inside PlaylistPanel
  const addInPanel = await page.$('button');
  const buttonsInModal = await page.$$('button');
  for (const b of buttonsInModal) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Add to playlist')) {
      await b.click();
      await page.waitForTimeout(1000);
      break;
    }
  }

  const shot3 = path.join(ARTIFACT_DIR, 'step3_add_modal_opened.png');
  await page.screenshot({ path: shot3 });
  console.log("Captured Step 3:", shot3);

  // 4. Click "Create new playlist" or click an existing playlist row
  const createBtn = await page.$('button');
  const allBtns = await page.$$('button');
  for (const b of allBtns) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Create new playlist')) {
      await b.click();
      await page.waitForTimeout(500);
      break;
    }
  }

  // Type playlist name if form is open
  const input = await page.$('input[placeholder="Playlist name"]');
  if (input) {
    await input.type('Morning Healing Flow');
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await page.waitForTimeout(1500);
    }
  }

  const shot4 = path.join(ARTIFACT_DIR, 'step4_playlist_created.png');
  await page.screenshot({ path: shot4 });
  console.log("Captured Step 4:", shot4);

  // 5. Click on playlist row to add audio to playlist
  const playlistItems = await page.$$('div');
  for (const item of playlistItems) {
    const text = await page.evaluate(el => el.textContent, item);
    if (text && (text.includes('Morning Healing Flow') || text.includes('audios') || text.includes('audio'))) {
      await item.click();
      await page.waitForTimeout(1000);
      break;
    }
  }

  const shot5 = path.join(ARTIFACT_DIR, 'step5_audio_added_toast.png');
  await page.screenshot({ path: shot5 });
  console.log("Captured Step 5:", shot5);

  await browser.close();
  console.log("Demo interaction complete!");
})();
