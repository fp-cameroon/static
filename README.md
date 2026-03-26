# Static Assets Repository — Release Process

This repository hosts **versioned static assets** served through the CDN.
It is **fully automated** using GitHub Actions.

---

## 📁 Repository Structure

```
js/
 ├─ _        # source (editable)
 └─ vX.Y.Z   # generated (do not edit)

css/
 ├─ _
 └─ vX.Y.Z

bin/
 └─ _
```

---

## 🧑‍💻 Developer Rules

Developers **must only modify** the following directories:

* `js/_`
* `css/_`
* `bin/_`

❌ Do NOT modify:

* versioned folders (`js/v*`, `css/v*`)
* `latest`
* generated content

The CI pipeline **will fail** if changes are made elsewhere.

---

## 🚀 Release Pipeline Overview

The release process is fully automated:

### 1. Pull Request Opened / Updated

* ✅ Validate that only `js/_`, `css/_`, `bin/_` changed
* ✅ Compute semantic version
* ✅ Create git tag `vX.Y.Z`
* ✅ Copy content:

  * `js/_ → js/vX.Y.Z`
  * `css/_ → css/vX.Y.Z`
* ✅ Publish version to CDN
* ✅ Send release email notification

### 2. Push to `main`

* ✅ Publish `_` folders as `latest`
* ❌ No version created
* ❌ No email sent

---

## 🔢 Semantic Versioning Rules

Version bump depends on changed directory:

| Directory changed | Version bump  |
|-------------------|---------------|
| `css/_`      | patch (0.0.X) |
| `js/_`       | minor (0.X.0) |

Examples:

```
v1.2.3 + css change → v1.2.4
v1.2.4 + js change  → v1.3.0
```

---

## 🌍 CDN Publishing

Two types of deployments:

### Latest (push to main)

```
/static/_/js/...
/static/_/css/...
/static/_/css/...
```

Used for:

* staging
* development
* non-pinned assets

### Versioned (pull request)

```
/static/vX.Y.Z/js/...
/static/vX.Y.Z/css/...
```

Used for:

* production
* immutable releases
* cache-safe deployments

---

### Binaries (bin/_)

Binary files are published to the CDN but **not versioned**.

- Location: `bin/_`
- Published to: `/static/bin/`
- Overwritten on each release
- Intended for CLI tools, helpers, converters

Example:

https://cdn.fp-cameroon.com/static/bin/vectorizer-linux-amd64

## 📣 Notifications

On each versioned release:

* Email sent to:

  * [admin@fp-cameroon.com](mailto:admin@fp-cameroon.com)
  * [ux@fp-cameroon.com](mailto:ux@fp-cameroon.com)

---

## ✅ Typical Workflow

1. Developer updates files in:

   ```
   js/_ or css/_ or bin/_
   ```

2. Open Pull Request

3. CI automatically:

   * validates
   * versions
   * publishes to CDN
   * notifies team

4. Assets become available immediately

---

## 🔒 Important Notes

* Versioned folders are **immutable**
* Always reference **versioned URLs** in production
* Use `latest` only for testing
* CDN cache is safe due to versioning

---

## 🎯 Example Usage

Production:

```
https://cdn.fp-cameroon.com/static/v1.4.2/js/app.js
```

Testing:

```
https://cdn.fp-cameroon.com/static/_/js/app.js
```

---

## 🧠 Summary

* Edit only `_` folders
* Open PR
* CI versions automatically
* CDN publishes automatically
* Team notified automatically
