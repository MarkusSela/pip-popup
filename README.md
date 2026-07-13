# PiP Popup

Safari Web Extension that activates Picture-in-Picture for any video with one click.

![Safari](https://img.shields.io/badge/Safari-Extension-blue?logo=safari) ![macOS](https://img.shields.io/badge/macOS-10.14+-lightgrey?logo=apple) ![License](https://img.shields.io/badge/license-MIT-green)

## How it works

Click the **PiP Popup** icon in the Safari toolbar while a video is playing — it instantly enters Picture-in-Picture mode. Works on YouTube, Vimeo, Netflix, and any site with an HTML5 `<video>` element. No popup window, no extra clicks.

## Install (pre-built)

1. Download `PiP.Popup.v1.0.1.macOS.zip` from the [latest release](https://github.com/MarkusSela/pip-popup/releases/latest)
2. Unzip and move **PiP Popup.app** to `/Applications`
3. Remove the quarantine attribute — open Terminal and run:
   ```bash
   xattr -dr com.apple.quarantine /Applications/PiP\ Popup.app
   ```
4. Open **PiP Popup.app** once to register the extension
5. **Safari → Settings → Extensions** → enable **PiP Popup**
6. **Safari → Settings → Advanced** → enable **Show Develop menu**
7. **Develop → Allow Unsigned Extensions**

## Build from source

Requires Xcode 14+ and an Apple ID added in **Xcode → Settings → Accounts**.

```bash
git clone https://github.com/MarkusSela/pip-popup.git
cd pip-popup
xcodebuild \
  -project "PiP Popup.xcodeproj" \
  -scheme "PiP Popup (macOS)" \
  -configuration Debug \
  CODE_SIGN_STYLE=Manual \
  CODE_SIGN_IDENTITY="<your certificate hash>" \
  DEVELOPMENT_TEAM="<your team ID>" \
  -derivedDataPath build
```

Or simply open the project in Xcode and press **⌘R** — Xcode will sign and launch it automatically.

> **Note:** macOS 14+ (and macOS 26) require a real Apple Development certificate for Safari to register the extension. Ad-hoc signing is not sufficient.

## Usage

1. Open a page with a video and start playback
2. Click the **PiP Popup** icon in the Safari toolbar
3. The video enters Picture-in-Picture mode instantly

## Requirements

- macOS 10.14 or later
- Safari 14 or later
- "Allow Unsigned Extensions" enabled (Develop menu)

## Changelog

### v1.0.1
- Removed popup window — clicking the icon now activates PiP directly
- Fixed *"The request is not triggered by a user activation"* error by using `scripting.executeScript` in the background `action.onClicked` handler
- Fixed extension not appearing in Safari on macOS 26 — now built with a real Apple Development certificate

### v1.0.0
- Initial release with popup UI

## License

MIT
