---
hide:
  - toc
  - navigation
---

# Complete InfoTool Reference

## 1. Core concepts

InfoTool is an integrated web platform for climate, environmental, and socio-economic information, designed to support evidence-based planning and climate-resilient decision-making at local and regional scales.

### 1.1 Main ideas

- **Open and accessible**: data, tools, and knowledge resources are available through a web platform.
- **Reliable data sources**: combines local, regional, and third-party datasets.
- **Decision support**: helps users move from data to planning and action.
- **Collaborative**: supports municipalities, researchers, planners, and citizens.
- **GeoNode-based**: built on a spatial data infrastructure for geodata sharing and visualization.

### 1.2 Core users

- Municipal planners.
- Researchers.
- Citizens.
- Students and educators.
- Administrative staff and project partners.

### 1.3 Description

<p>InfoTool is a climate information and decision-support platform that brings together datasets, analysis tools, publications, and collaboration features in one web-based environment.
</p>

---

## 2. Platform architecture

<p>InfoTool combines content management, data analysis, data collection, and dissemination in one integrated architecture.</p>

### 2.1 Main components

- **User groups**: planners, researchers, and citizens.
- **Content categories**: datasets, research, education, news, library, planning and design.
- **Data analysis and visualization**: environmental data, primary data, secondary data, publications, and adaptation methods.
- **Data collection and management**: APIs, importers, OGC services, external sources, documents, and visualization.
- **GeoNode infrastructure**: spatial data storage, access, and publishing.

### 2.2 Use case

- Organize climate data in one place.
- Connect public knowledge with internal planning data.
- Support decisions with maps, dashboards, and reports.

### 2.3 Example

Architecture flow:
data sources -> management -> analysis -> dissemination -> decisions and action


---

## 3. User groups

InfoTool is designed for multiple stakeholder groups with different needs and permissions.

### 3.1 Common user groups

- **Planners** - use climate and land-use information for municipal decisions.
- **Researchers** - analyze datasets and publish scientific outputs.
- **Citizens** - explore climate knowledge and contribute to community resilience.
- **Students and educators** - learn, train, and use the platform for capacity building.
- **Administrators** - manage data access, users, and content.

### 3.2 Use case

- Municipal staff can assess flood risk or heat stress.
- Researchers can access datasets and publications.
- Citizens can explore learning materials and current information.

### 3.3 Example

A planner opens the platform, checks climate indicators, reviews municipal boundaries, and prepares adaptation options for a district.


---

## 4. Content categories

The platform organizes content into thematic categories to support discovery and reuse.

### 4.1 Common categories

- **Datasets** - spatial and tabular data resources.
- **Research** - studies, case work, and analysis.
- **Education** - tutorials, learning modules, and training.
- **News and blog** - updates and announcements.
- **Library** - manuals, documents, and reference material.
- **Planning and design** - adaptation concepts and planning resources.

### 4.2 Use case

- Help users find the right content quickly.
- Separate scientific resources from operational planning material.
- Support both expert and public audiences.

### 4.3 Example

A user searches the library for adaptation guidelines, then opens related datasets and case studies.

---

## 5. Data analysis and visualization

InfoTool supports climate-related analysis through environmental data, primary municipal data, secondary datasets, and publication outputs.

### 5.1 Environmental data

- Forest and land cover.
- Water quality.
- Precipitation.
- Surface temperature.
- Monitoring dashboard outputs.

### 5.2 Primary data

- Land use data.
- Administrative boundaries.
- Citizen science data.
- Climate risks and hazards.
- Hydrology.

### 5.3 Secondary data

- Geoportals and third-party datasets.
- Climate atlas sources.
- Socio-economic and demographic data.
- Weather service data.
- Hydrometeorology.
- Landsat and Sentinel imagery.

### 5.4 Publications and methods

- Scientific work.
- Specifications.
- Reports.
- Catalogues.
- Case studies.
- Guidelines.
- Portfolios.
- Intervention options.

### 5.5 Use case

- Compare heat and flood indicators across neighborhoods.
- Combine municipal datasets with external geospatial sources.
- Produce plots, dashboards, and planning outputs.

### 5.6 Example

Environmental indicators + municipal boundaries + dashboard views = localized climate risk assessment.

---

## 6. Data collection and management

The platform integrates multiple data ingestion and access methods to support sustainable data workflows.

### 6.1 Common methods

- **SensorThings API** - sensor and observation data access.
- **REST API** - programmatic access with permissions.
- **Data importer** - upload and publish datasets.
- **OGC web services** - standards-based GIS interoperability.
- **External sources** - connect third-party datasets.
- **Transformer / web news / geostories** - distribute content and stories.
- **Documents** - manuals, reports, and supporting files.

### 6.2 Use case

- Import a new dataset and make it available to the public or internal users.
- Connect real-time sensor data.
- Publish geospatial resources through standard services.

### 6.3 Example

A municipal team uploads a GeoTIFF, adds metadata, reviews the dataset, and publishes it through the web portal.

---

## 7. Methodology flow

InfoTool follows a workflow from collecting data to making decisions and acting on insights.

### 7.1 Main steps

1. **Collect** - gather data from sensors, authorities, geoplatforms, and documents.
2. **Manage** - store, integrate, secure, and standardize data.
3. **Analyze** - process data and generate insights.
4. **Disseminate** - share datasets, maps, reports, blogs, and training content.
5. **Decide and act** - support adaptation, monitoring, and planning.

### 7.2 Use case

- This flow supports evidence-based planning.
- It enables continuous feedback and monitoring.
- It helps turn analysis into interventions.

### 7.3 Example

Collect -> Manage -> Analyze -> Disseminate -> Decide & Act

---

## 8. Key benefits

InfoTool is built to support climate resilience, knowledge sharing, and accessible decision support.

### 8.1 Benefits

- One-stop platform for climate and environmental information.
- Reliable, up-to-date, spatially enabled data.
- Collaboration between institutions and communities.
- Evidence-based planning and adaptation support.
- Open, interoperable, future-ready infrastructure.

### 8.2 Use case

- Reduce fragmented data access.
- Improve transparency in planning.
- Strengthen community participation and institutional coordination.

### 8.3 Example

A municipality uses one platform for data, maps, reports, and adaptation planning instead of many disconnected tools.

---

## 9. Climate adaptation applications

InfoTool supports practical climate adaptation planning with thematic applications.

### 9.1 Common application areas

- **Urban heat and heat islands** - map heat stress and cooling options.
- **Flood and heavy rainfall risk** - identify vulnerable areas and support early warning.
- **Green-blue infrastructure** - plan nature-based solutions.
- **Municipal climate profiles** - build local evidence for reporting and planning.
- **E-learning and knowledge exchange** - support learning and capacity building.

### 9.2 Use case

- Support municipal climate action plans.
- Prioritize investments in nature-based solutions.
- Communicate adaptation options to stakeholders.

### 9.3 Example

A planner combines heat maps, population exposure, and green infrastructure layers to identify priority neighborhoods for cooling measures.

---

## 10. Technologies and standards

The platform uses open standards and common web technologies to ensure interoperability and scalability.

### 10.1 Common technologies

- **GeoNode** - spatial data infrastructure and publishing platform.
- **SensorThings API** - IoT and sensor data standard.
- **OGC standards** - interoperable geospatial web services.
- **REST API** - modern application integration.
- **PostgreSQL** - relational database.
- **Python** - scripting and data processing.
- **Docker** - containerization.
- **NGINX** - web server and reverse proxy.

### 10.2 Use case

- Build a scalable geodata hub.
- Support service-based data exchange.
- Maintain a secure and modular platform.

### 10.3 Example

GeoNode + PostgreSQL + REST API + OGC services = a web-based spatial data infrastructure.

---

## 11. Who can use it

InfoTool is designed for a wide user community.

### 11.1 Main audiences

- **Municipal planners** - make land-use and adaptation decisions.
- **Researchers** - analyze data and publish findings.
- **Students and educators** - learn and build capacity.
- **Citizens** - stay informed and contribute to resilience.
- **Administrators** - manage data, services, and users.

### 11.2 Use case

- A researcher accesses datasets and publications.
- A citizen explores climate information for their neighborhood.
- A planner uses maps and indicators to guide action.

### 11.3 Example

Users explore the same platform, but each group sees content and tools relevant to its role.

---

## 12. Data upload and publishing

The platform supports manual upload and publication of geodata through a simple workflow.

### 12.1 Typical steps

1. Upload a document or dataset.
2. Apply or edit dataset styling.
3. Add metadata.
4. Review the result.
5. Publish the dataset.

### 12.2 Use case

- Share new geospatial datasets quickly.
- Improve discoverability with metadata.
- Ensure datasets are usable for others.

### 12.3 Example

Upload a GeoPackage -> style it -> add metadata -> review -> publish.

---

## 13. Co-design and collaboration

InfoTool is built through collaboration with municipalities and other partners.

### 13.1 Common activities

- Workshops.
- Online surveys.
- User story development.
- Partner discussions.
- Feedback cycles.

### 13.2 Use case

- Collect requirements from local authorities.
- Test interfaces with intended users.
- Improve content and structure through iterative design.

### 13.3 Example

Workshop feedback is used to refine the climate indicators, learning resources, and map interfaces.

---

## 14. Open knowledge and dissemination

InfoTool is not only a data platform; it also supports communication and education.

### 14.1 Common dissemination formats

- Datasets and maps.
- Reports and publications.
- News and geostories.
- Educational resources.
- Catalogues and case studies.

### 14.2 Use case

- Share climate knowledge with both technical and non-technical users.
- Provide materials for learning and awareness.
- Support transparent decision-making.

### 14.3 Example

A published report links to the underlying map layers, related indicators, and background documents.

---

## 15. System design and content

The platform combines structured data, stories, tools, and profiles into one information ecosystem.

### 15.1 Common content elements

- Datasets and indicators.
- Reports and documents.
- Learning modules and tutorials.
- Case studies and research.
- Community and municipal profiles.
- Tools, dashboards, and APIs.

### 15.2 Use case

- Build a city or district profile.
- Connect narrative explanations with map layers.
- Support both exploration and operational use.

### 15.3 Example

A municipal profile page links climate indicators, documents, tools, and datasets for one geographic area.

---

## 16. Quick reference table

| Area | Key elements | Purpose |
|---|---|---|
| Users | Planners, researchers, citizens | Serve different stakeholder groups. |
| Content | Datasets, research, education, news | Organize knowledge resources. |
| Analysis | Environmental data, dashboards, indicators | Support climate assessment. |
| Collection | APIs, importers, OGC services | Bring data into the platform. |
| Dissemination | Reports, maps, geostories | Share results and knowledge. |
| Action | Adaptation options, planning support | Convert data into decisions. |

---

## 17. Example full workflow
```
Municipal staff upload local datasets, enrich them with metadata, analyze heat and flood risks, publish results, and use the outputs to support adaptation planning.
```