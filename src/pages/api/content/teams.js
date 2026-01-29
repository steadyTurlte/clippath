import { getData, saveData } from "@/utils/dataUtils";

// Default teams data
const defaultTeamsData = {
  banner: {
    title: "Our Team",
    image: "",
    breadcrumbs: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Team",
        link: "/teams",
      },
    ],
  },
  team: {
    subtitle: "expert team",
    title: "Meet the awesome team",
    description:
      "Our team of skilled professionals is dedicated to delivering exceptional results for every project.",
    members: [],
  },
  section: {
    subtitle: "team section",
    title: "Team Section Title",
    description: "Team section description",
    largeImage: "",
  },
};

export default async function handler(req, res) {
  const { method, body, query } = req;
  const configKey = "teams";
  const { section } = query;

  try {
    switch (method) {
      case "GET":
        // Get all teams data or a specific section
        const data = await getData(configKey) || defaultTeamsData;

        if (section) {
          if (data[section]) {
            return res.status(200).json(data[section]);
          }
          return res.status(404).json({ error: `Section ${section} not found` });
        }

        return res.status(200).json(data);

      case "PUT":
        // Update teams data
        if (!body) {
          return res.status(400).json({ error: "Request body is required" });
        }

        // Check if updating a specific section
        if (section) {
          const currentData = await getData(configKey) || { ...defaultTeamsData };
          currentData[section] = body;

          const success = await saveData(configKey, currentData);
          if (!success) {
            throw new Error("Failed to save teams data");
          }

          return res.status(200).json({
            message: "Teams section updated successfully",
            data: currentData[section],
          });
        }

        // Update entire teams data
        const bulkSuccess = await saveData(configKey, body);
        if (!bulkSuccess) {
          throw new Error("Failed to update teams data");
        }

        return res.status(200).json({
          message: "Teams data updated successfully",
          data: body,
        });

      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Teams API error:", error);
    return res.status(500).json({
      error: "An error occurred while processing your request",
      details: error.message,
    });
  }
}
