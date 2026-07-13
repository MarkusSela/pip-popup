# PiP Popup

Safari Web Extension that activates Picture-in-Picture for any video with one click.

![Safari](https://img.shields.io/badge/Safari-Extension-blue?logo=safari) ![macOS](https://img.shields.io/badge/macOS-10.14+-lightgrey?logo=apple) ![License](https://img.shields.io/badge/license-MIT-green)

## How it works

Click the **PiP Popup** icon in the Safari toolbar while a video is playing — it instantly enters Picture-in-Picture mode. Works on YouTube, Vimeo, Netflix, and any site with an HTML5 `<video>` element.

## Install

1. Download `PiP.Popup.macOS.zip` from the [latest release](https://github.com/MarkusSela/pip-popup/releases/latest)
2. Unzip and move **PiP Popup.app** to `/Applications`
3. Open Terminal and run:
   ```bash
   xattr -dr com.apple.quarantine /Applications/PiP\ Popup.app
   ```
4. Open **PiP Popup.app** once to register the extension
5. **Safari → Settings → Extensions** → enable **PiP Popup**
6. **Safari → Settings → Advanced** → enable **Show Develop menu**
7. **Develop → Allow Unsigned Extensions**

## Build from source

Open the project in Xcode and press **⌘R**.

> macOS requires a real Apple Development certificate to register Safari extensions. Add your Apple ID in Xcode → Settings → Accounts.

## Requirements

- macOS 10.14 or later
- Safari 14 or later
- "Allow Unsigned Extensions" enabled (Develop menu)

## Support

PiP Popup is free and always will be.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/marukoshi)

## License

MIT
