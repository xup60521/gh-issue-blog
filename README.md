# Github Issue Blog

Dcard前端實習作業。

Deploy website: https://gh-issue-blog.vercel.app/

# 開始使用

## env 設定

詳見`.env.example`，其中因為Github對於未授權的請求有流量限制 50 requests / hour，使用GITHUB_PERSONAL_TOKEN就能繞過著個限制。

## 設定Repository網址

這部分沒有寫在env裡面，而是請到`src/lib/utils.ts`做設定。

裡面可以看到有匯出一個`GhBaseURL`，格式如下

```js
export const GhBaseURL = "https://api.github.com/repos/<user>/<repo>/issues"
```

請依照自己的需求修改

## Github OAuth App

請登入Github後到Settings > Developer Settings > OAuth Apps新增一個App。
Callback網址請自行設定，若在本地端執行，Next.js預設`PORT=3000`，則callback url為`http://localhost:3000/api/auth/callback/github`，以讓程式Next Auth可以正常運作。

## 啟動

專案是由pnpm來管理，在clone下來後，請先安裝套件

```bash
pnpm i
```

之後，再來執行Next.js dev server

```bash
pnpm run dev
```

預設的PORT=3000，在瀏覽器打開`http://localhost:3000`應該就能正常顯示了。

# 架構

整個頁面風格是模仿Dcard的設計。幾乎所有關於fetch、post等非同步事件的操作都是藉由Nextjs 14 Server Action來完成，除了新增、刪除、修改文章以外，因為會需要使用者登入後傳回的access_token，因此就在client端完成。

## 文章列表&頁面

由於使用了React Server Component，進入頁面一開始的資料會從RSC載入，之後Client Compoent `<MainContent >`會偵測頁面的滾動，當滾到底就會觸發事件，fetch下一頁的資料。

當點入文章後，會顯示浮動的Popup，並透過`window.history.pushState`更新網址，也會觸發fetch comment，這樣子留言就能正常顯示。此時若是重新整理，則會直接顯示`app/post/[id]/page.tsx`的內容，達成類似Dcard頁面Client side navigation的體驗。

進到單獨的頁面中，文章、留言都是在RSC就讀取完成，所以不再需要useEffect去fetch資料。

如果登入，則無論Popup還是單獨頁面都會顯示修改的按鈕，按一下都會跑到獨立的頁面，在那裏可以選擇要修改、刪除文章。

## 登入

我使用Next Auth來作為認證的工具。除了新增`GithubProvider`以外，還要再callbacks處修改`jwt`與`session`欄位。再來型別部分，由於`create-t3-app`已經將依些模板定義好了，我只要簡單修改回傳的類別，加入`access_token`欄位，之後新增、編輯、刪除的功能就都可以使用了。

## Styling

雖然一直都有些drama，我這裡使用tailwindCSS來做styling。

## Markdown Preview

這是自己想要加的，但野花最多的時間。因為TailwindCSS會把所有的html element css重製，所以由markdown渲染出來的html會沒有效果。

我使用暴力解，透過下載並匯入Github Markdown的CSS檔案，稍微修改一下背景顏色，並調整className，如此這樣Markdown Preview就能正確顯示了。