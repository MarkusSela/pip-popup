# PiP Popup

Safari Web Extension that activates Picture-in-Picture for any video with one click.

![Safari](https://img.shields.io/badge/Safari-Extension-blue?logo=safari) ![macOS](https://img.shields.io/badge/macOS-10.14+-lightgrey?logo=apple) ![License](https://img.shields.io/badge/license-MIT-green)

## How it works

Click the **PiP Popup** icon in the Safari toolbar while a video is playing — it instantly enters Picture-in-Picture mode. Works on YouTube, Vimeo, Netflix, and any site with an HTML5 `<video>` element.

## Install (pre-built)

> No Apple Developer account required.

1. Download `PiPPopup.zip` from the [latest release](https://github.com/MarkusSela/pip-popup/releases/latest)
2. Unzip and move **PiP Popup.app** to `/Applications`
3. Open the app once to register the extension
4. **Safari → Settings → Extensions** → enable **PiP Popup**
5. Enable the Develop menu: **Safari → Settings → Advanced → Show Develop menu**
6. **Develop → Allow Unsigned Extensions**

## Build from source

Requires Xcode 14+ on macOS.

```bash
git clone https://github.com/MarkusSela/pip-popup.git
cd pip-popup
xcodebuild \
  -project "PiP Popup.xcodeproj" \
  -scheme "PiP Popup (macOS)" \
  -configuration Debug \
  CODE_SIGN_IDENTITY="-" \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGNING_ALLOWED=NO \
  -derivedDataPath build
```

The built app will be at `build/Build/Products/Debug/PiP Popup.app`.

## Usage

1. Go to any page with a video and start playback
2. Click the **📺 PiP Popup** icon in the Safari toolbar
3. The video enters Picture-in-Picture mode

## Requirements

- macOS 10.14 or later
- Safari 14 or later
- "Allow Unsigned Extensions" enabled (Develop menu)

## License

MIT
