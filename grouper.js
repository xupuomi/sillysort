import { pipeline } from '@xenova/transformers'
import * as kmeans from 'ml-kmeans'
import silhouette from '@robzzson/silhouette'
const generateEmbedding = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L12-v2')
var map = {}
async function get_word_vec(word) {
    const output = await generateEmbedding(word, {pooling: 'mean', normalize: true})
    map[output.data] = word
    return Array.from(output.data)
}

const words = ['.config', 'hot-dogs-1.txt', 'Readability.csv', '3sysl_count.png', 'Ascend Analytics Cover Letter.pdf', 'coke_pepsi_scatter.png', 'HW_1.pdf', 'discussion-problems.pdf', 'Spring 2024 - Urbana-Champaign.ics', 'food_afford_cdp_co_region_ca4-14-13-ada.xls', 'CS 361 Textbook.pdf', 'LING 307 HW 2.pdf', '5 Ws_Worksheet_LAS 101_FA23 (1).docx', 'Math415_Spring2019_Midterm1_exams.pdf', '1_Module_Assignment.pdf', 'IMG_2776.jpg', '1_Module_Assignment.ipynb', 'Pranav_Virupaksha_Resume_2024.pdf', 'Calorie_hist.png', 'Spring 2024 - Urbana-Champaign (1).ics', '05_question_answering.ipynb', '1-s2.0-S1877050920300752-main.pdf', 'Joby Cover Letter.pdf', 'GGIS 407 Lab 1 Reflection.pdf', 'costpermw_hist.png', 'UIUC.pdf', 'cig_lung_scatter.png', 'coke_pepsi_scatter_.png', '- Sea-level ISA cond.pdf', 'sentence_count.png', 'Spring 2024 - Urbana-Champaign (3).ics', 'HW_2.pdf', 'food-affordability-2006-2010-metadata.csv', '510F060391E8487ABDDD5450ED9A19E2.pdf', '5d6fca1f2e22af3bbe6c07b2.webp', 'KO.csv', 'transcript-sp24.pdf', '5 Ws_Worksheet_LAS 101_FA23.docx', 'Ecosystem Mapping Worksheet.pdf', 'nuclear-plants.txt', '2  Campbell lexical and semantic change HO.docx', 'PEP.csv', 'cigcancer-1.txt', 'Pranav_Virupaksha_Resume_2024.png', 'UIUC Essays.pdf', 'MATH415_FALL2017_Midterm1_Practice_solutions.pdf', '1632.full.pdf', '2024_swe_internship_vibe_analysis_assignment.BIN', '2022 Journal Author Information Form.docx', 'HW_0.pdf', 'Sodium_hist.png', 'Resume_2023.pdf', 'Business Model Canvas Template 16x9.pptx.pdf', 'Spring 2024 - Urbana-Champaign (2).ics', '29f6ce7664ca9d2bdb09feca23f4eddf3f6e2e7fc0e20a461378e2ab.jpeg', '5 Ws_Worksheet_LAS 101_FA23.docx.pdf', 'HW_3.pdf', 'Estimation_for_Quadrotors.pdf', 'transcript_fa2023.pdf', '2018+Central+Park+Squirrel+Census+-+Squirrel+Data.geojson', '05b8d16ae3c2a2b3eb9533f5f45e4ca4f66028c131b119cf16bd2abb.jpeg', 'sample_data'];
const vectors = []
for (var i = 0; i < words.length; i++) {
    const out = await get_word_vec(words[i]);
    vectors.push(out);
}

let k = Math.round(Math.sqrt(words.length));
let ans = kmeans.kmeans(vectors, k).clusters;

let clusters = Array.from({ length: k }, () => []);
for (var i = 0; i < ans.length; i++) {
  const c = ans[i]
  clusters[c].push(map[vectors[i]])
}

console.log(clusters)

