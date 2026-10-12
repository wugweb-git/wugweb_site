#!/usr/bin/env bash
# Upload the local originals that are NOT yet in R2 (PDFs, sendgb zips and files already covered by an optimised R2 copy are skipped).
# Needs: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY (R2 S3 keys); run from the repo root.
set -euo pipefail
export AWS_REQUEST_CHECKSUM_CALCULATION=when_required AWS_RESPONSE_CHECKSUM_VALIDATION=when_required
EP=https://76fe2175ba7e055fe358b3056d5f6a6c.r2.cloudflarestorage.com
up(){ aws s3 cp "$1" "s3://wugweb-assets/$2" --region auto --endpoint-url "$EP"; }
up "assets/Case Studies/Plufo/Design_Philosophy.mp4" "assets/unsorted/local-originals/Case Studies/Plufo/Design_Philosophy.mp4"
up "assets/mapped assets/RAK Logo/RAK SME.ai" "assets/unsorted/local-originals/mapped assets/RAK Logo/RAK SME.ai"
up "assets/mapped assets/VSB/Project_Presentation_Vision1 _updated.pptx" "assets/unsorted/local-originals/mapped assets/VSB/Project_Presentation_Vision1 _updated.pptx"
up "assets/mapped assets/VSB/Resume 2023.docx" "assets/unsorted/local-originals/mapped assets/VSB/Resume 2023.docx"
up "assets/mapped assets/VSB/SBS2023.ai" "assets/unsorted/local-originals/mapped assets/VSB/SBS2023.ai"
up "assets/mapped assets/VSB/Vision1 .pptx" "assets/unsorted/local-originals/mapped assets/VSB/Vision1 .pptx"
up "assets/mapped assets/VSB/adtech_31_01_2023 – 1.ai" "assets/unsorted/local-originals/mapped assets/VSB/adtech_31_01_2023 – 1.ai"
up "assets/mapped assets/VSB/artwork.ai" "assets/unsorted/local-originals/mapped assets/VSB/artwork.ai"
up "assets/mapped assets/data 2026/videoplayback.mp4" "assets/unsorted/local-originals/mapped assets/data 2026/videoplayback.mp4"
up "assets/mapped assets/indusninja/IndusInd App screens_1 (1) (1).key" "assets/unsorted/local-originals/mapped assets/indusninja/IndusInd App screens_1 (1) (1).key"
up "assets/mapped assets/inkompass/inkompass.zip" "assets/unsorted/local-originals/mapped assets/inkompass/inkompass.zip"
up "assets/_originals_over_5mb/Case Studies/Cartier/Solution.png" "assets/unsorted/local-originals/_originals_over_5mb/Case Studies/Cartier/Solution.png"
up "assets/_originals_over_5mb/Case Studies/Gratify/Group 1.png" "assets/unsorted/local-originals/_originals_over_5mb/Case Studies/Gratify/Group 1.png"
up "assets/_originals_over_5mb/Case Studies/Metcred App/Free_K_Mockups_iPhone_15_Pro.jpg" "assets/unsorted/local-originals/_originals_over_5mb/Case Studies/Metcred App/Free_K_Mockups_iPhone_15_Pro.jpg"
up "assets/_originals_over_5mb/Case Studies/Metcred App/credit-card-studio.png" "assets/unsorted/local-originals/_originals_over_5mb/Case Studies/Metcred App/credit-card-studio.png"
up "assets/_originals_over_5mb/Case Studies/Metcred LP/Free_Hand_Holding_iPhone_16_Pro_Mockup.jpg" "assets/unsorted/local-originals/_originals_over_5mb/Case Studies/Metcred LP/Free_Hand_Holding_iPhone_16_Pro_Mockup.jpg"
up "assets/_originals_over_5mb/Case Studies/Metcred LP/Free_K_Mockups_iPhone_15_Pro.jpg" "assets/unsorted/local-originals/_originals_over_5mb/Case Studies/Metcred LP/Free_K_Mockups_iPhone_15_Pro.jpg"
up "assets/_originals_over_5mb/Case Studies/NTUC/Filler-2.png" "assets/unsorted/local-originals/_originals_over_5mb/Case Studies/NTUC/Filler-2.png"
up "assets/_originals_over_5mb/Case Studies/Ryde EV/Filler-2.png" "assets/unsorted/local-originals/_originals_over_5mb/Case Studies/Ryde EV/Filler-2.png"
up "assets/_originals_over_5mb/mapped assets/VSB/CF068618.png" "assets/unsorted/local-originals/_originals_over_5mb/mapped assets/VSB/CF068618.png"
up "assets/_originals_over_5mb/mapped assets/VSB/CF068643.png" "assets/unsorted/local-originals/_originals_over_5mb/mapped assets/VSB/CF068643.png"
up "assets/_originals_over_5mb/mapped assets/VSB/CF068690.png" "assets/unsorted/local-originals/_originals_over_5mb/mapped assets/VSB/CF068690.png"
up "assets/_originals_over_5mb/mapped assets/VSB/CF068693.png" "assets/unsorted/local-originals/_originals_over_5mb/mapped assets/VSB/CF068693.png"
